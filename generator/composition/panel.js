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
        url: '${config.api}',
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

  const stateFragment= `
    // 响应状态
    const state = reactive({
      dlgVisble: false,
      ${formStateFragment}
    })
  `

  const requestFragment = `
    // 数据请求
    const submit = async () => {
      ${
        panel.form.api
          ? `
            const listResponse = await getListData(state.querys, state.page.pageSize, state.page.currentPage)
            state.list = listResponse ? listResponse.records : state.list  
          `
          : ''
      }
    }

    // 生命周期
    onMounted(() => {
      fetchData()
    })
  `

  const eventFragment = `
    // 事件响应
    state.onQuery = () => {
      fetchData()
    }
    state.onReset = () => {
      state.querys = reactive({
        str: '',
        department: ''
      })
      fetchData()
    }
    state.onSizeChange = size => {
      state.page.pageSize = size
      fetchData()
    }
    state.onCurrentChange = index => {
      state.page.currentPage = index
      fetchData()
    }
  `
  
  const exportFragment = `
    export default () => {
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
  const fragment = makeFragment(config)
  fs.mkdirSync(config.output, { recursive: true })
  fs.writeFileSync(path.resolve(config.output, './use.table.js'), fragment)
}