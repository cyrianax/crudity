import { reactive, onMounted } from 'vue'
import request from '@/utils/request'

const getListData = (data, currentPage = 1, pageSize = 10) =>
  request({
    url: `undefined?currentPage=${currentPage}&pageSize=${pageSize}`,
    method: 'post',
    data,
  })

export default () => {
  // 响应状态
  const state = reactive({
    list: [],
    querys: {
      iretion: '',
    },
    page: {
      currentPage: 1,
      pageSize: 20,
      total: 0,
    },
  })

  // 数据请求
  const fetchData = async () => {
    const listResponse = await getListData(
      state.querys,
      state.page.pageSize,
      state.page.currentPage
    )
    state.list = listResponse ? listResponse.records : state.list
  }

  // 生命周期
  onMounted(() => {
    fetchData()
  })

  // 事件响应
  state.onQuery = () => {
    fetchData()
  }
  state.onReset = () => {
    state.querys = reactive({
      str: '',
      department: '',
    })
    fetchData()
  }
  state.onSizeChange = (size) => {
    state.page.pageSize = size
    fetchData()
  }
  state.onCurrentChange = (index) => {
    state.page.currentPage = index
    fetchData()
  }

  return state
}
