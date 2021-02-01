import { reactive, onMounted } from 'vue'
import request from '@/utils/request'

const commitData = (data) =>
  request({
    url: '/m/l',
    method: 'post',
    data,
  })

export default () => {
  // 响应状态
  const state = reactive({
    dlgVisble: false,

    form: {
      iretion: '',
    },
  })

  // 数据请求
  const submit = async () => {
    const listResponse = await commitData(state.form)
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
