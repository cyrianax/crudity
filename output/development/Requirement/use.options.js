import { reactive, onMounted } from 'vue'
import request from '@/utils/request'

const getDepOptions = () => request({ url: '/api/m/login' })

export default () => {
  // 响应状态
  const state = reactive({
    sex: [],
    dep: [],
  })

  // 数据请求
  const fetchData = async () => {
    const depResponse = await getDepOptions()
    state.dep = depResponse ? depResponse.records : state.dep
  }

  // 生命周期
  onMounted(() => {
    fetchData()
  })

  return state
}
