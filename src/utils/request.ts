import Axios from 'axios'
import { useCookieState } from 'vue-hooks-plus'

// 创建一个 Axios 实例
const Request = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  timeout: 8000,
  headers: { 'content-type': 'application/json' },
  withCredentials: true,
})

// 请求拦截器
Request.interceptors.request.use(
  (config) => {
    const [token] = useCookieState('admin-token')

    if (token?.value) {
      config.headers.token = token?.value
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
Request.interceptors.response.use(
  (response) => {
    return response?.data
  },
  (error) => {
    ElNotification({
      message: error?.response?.data?.msg || '请求失败，请联系技术支持',
      type: 'error',
      duration: 3000,
    })

    return Promise.reject(error)
  },
)

export default Request
