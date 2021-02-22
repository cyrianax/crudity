const fs = require('fs')
const path = require('path')

const { beautify } = require('../utils')

const makeFragment = panel => {
  const importFragment = `
    import { reactive, onMounted } from 'vue'
    import request from '@/utils/request'
  `

  const apiFragment = panel.form.api 
    ? `
      const commitData = data => request({
        url: '${panel.form.api}',
        method: 'post',
        data
      })
    ` 
    : ''

  const formStateFragment = `
    form: {
      ${panel.form.items.map(item => {
        return `
          ${item.model}: ''
        `
      }).join(',\n')}
    }
  `  

  const ruleStateFragment = `
    rules: {
      ${panel.form.items.map(item => {
        return `
          ${item.model}: ''
        `
      }).join(',\n')}
    }
  `  

  const stateFragment= `
    // 响应状态
    const state = reactive({
      dlgVisble: false,
      ${formStateFragment}
      ${ruleStateFragment}
    })
  `

  const requestFragment = `
    // 数据请求
    const submit = async () => {
      ${
        panel.form.api
          ? `
            const commitResponse = await commitData(state.form)
          `
          : ''
      }
    }
  `

  const eventFragment = `
    // 事件响应
    state.onOpen = () => {
      state.dlgVisble = true
    }
    state.onSubmit = async () => {
      await submit()
      success()
    }
    state.onReset = () => {
      state.form = reactive({
        ${formStateFragment}
      })
    }
  `
  
  const exportFragment = `
    export default ({ success }) => {
      ${stateFragment}
      
      ${requestFragment}

      ${eventFragment}

      return state
    }
  `

  return beautify([
    importFragment,
    apiFragment,
    exportFragment
  ].join('\n'))
}

module.exports = config => {
  config.panels.forEach(panel => {
    const fragment = makeFragment(panel)
    fs.mkdirSync(config.output, { recursive: true })
    fs.writeFileSync(path.resolve(config.output, `./use.panel.${panel.name}.js`), fragment)
  })
}
