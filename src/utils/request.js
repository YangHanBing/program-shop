import axios from 'axios'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  })
// 响应拦截器
service.interceptors.response.use(
  (res) => {
    if (res.data.msg === 'ok') {
      return res.data.data
    }
    return res
  },
  (err) => {
    return Promise.reject(err)
  })
// 统一传参为data
const request = (options) => {
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data || {}
  }
  return service(options)
}

export default request
