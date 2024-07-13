import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { Message } from '@arco-design/web-vue'
const baseURL = '/api'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000
})
//请求拦截器
instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    //获取userStore对象
    if (userStore.token) {
      //在请求头中设置Authorization携带token数据
      config.headers.Authorization = 'Bearer ' + encodeURIComponent(userStore.token)
    }
    return config
  },
  (err) => Promise.reject(err)
)
instance.interceptors.response.use(
  (res) => {
    return res
  },
  (err) => {
    //错误的特殊情况 => 401权限不足或者token过期 =>拦截到登陆界面
    if (err.response?.status === 401) {
      Message.error('权限不足，请重新登录')
    }
    if (err.response?.status === 400) {
      Message.error(err.response.data ?? '请求错误，请检查参数')
    }
    //错误的默认情况 => 只要给提示
    return Promise.reject(err)
  }
)
export default instance
export { baseURL }
