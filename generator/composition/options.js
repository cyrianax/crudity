const fs = require('fs')
const path = require('path')

const { getOptions, capitalize, beautify } = require('../utils')

const makeFragment = options => {
  const importFragment = `
    import { reactive, onMounted } from 'vue'
    import request from '@/utils/request'
  `

  const apiFragment = options.map(({ model, api }) => {
    return api ? `const get${capitalize(model)}Options = () => request({ url: '${api}' })` : ''
  }).filter(fragment => fragment).join('\n')

  const stateFragment= `
    // 响应状态
    const state = reactive({
      ${options.map(({ model, items = [] }) => {
        const valueFragment = items.length > 0 ? '[\n' + items.map(({ label, value }) => {
          return `{ label: '${label}', value: ${typeof value === 'string' ? `'${value}'` : value} }`
        }).join(',\n') + ']' : '[]'
        return `${model}: ${valueFragment}`
      }).join(',\n')}
    })
  `
  const requestFragment = `
    // 数据请求
    const fetchData = async () => {
      ${options.map(({ model, api }) => {
        return api ? `
          const ${model}Response = await get${capitalize(model)}Options()
          state.${model} = ${model}Response ? ${model}Response.records : state.${model}  
        ` : ''
      }).filter(fragment => fragment).join('\n')}
    }

    // 生命周期
    onMounted(() => {
      fetchData()
    })
  `
  
  const exportFragment = `
    export default () => {
      ${stateFragment}
      
      ${requestFragment}

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
  const options = getOptions(config)
  const fragment = makeFragment(options)
  fs.mkdirSync(config.output, { recursive: true })
  fs.writeFileSync(path.resolve(config.output, './use.options.js'), fragment)
}
