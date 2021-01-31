const fs = require('fs')
const path = require('path')

const { beautify } = require('../utils')

const makeFragment = config => {
  const importFragment = `
    import { reactive, onMounted } from 'vue'
    import request from '@/utils/request'
  `

  const apiFragment = config.table.api 
    ? `
      const getListData = (data, currentPage = 1, pageSize = 10) => request({
        url: \`${config.api}?currentPage=\${currentPage}&pageSize=\${pageSize}\`,
        method: 'post',
        data
      })
    ` 
    : ''

  const listStateFragment = `
    list: []
  `

  const filterStateFragment = config.filter 
    ? `
      querys: {
        ${config.filter.items.map(item => {
          return `
            ${item.model}: ''
          `
        }).join(',\n')}
      }
    `  
    : ''

  const pageStateFragment = config.page
    ? `
      page: {
        currentPage: 1,
        pageSize: 20,
        total: 0
      }
    `
    : ''

  const stateFragment= `
    // 响应状态
    const state = reactive({
      ${
        [
          listStateFragment, 
          filterStateFragment, 
          pageStateFragment
        ].filter(fragment => fragment).join(',\n')
      }
    })
  `

  const requestFragment = `
    // 数据请求
    const fetchData = async () => {
      ${
        config.table.api
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
