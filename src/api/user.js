import request from '@/utils/request'
// 登录接口
const login = (data) => {
  return request({
    url: '/admin/login',
    method: 'POST',
    data
  })
}
// 获取用户信息
const getUserInfo = () => {
  return request({
    url: '/admin/getinfo',
    method: 'POST'
  })
}
// 获取主控台信息1
const getStatistics1 = () => {
  return request({
    url: '/admin/statistics1',
    method: 'GET'
  })
}
// 获取主控台信息2
const getStatistics2 = () => {
  return request({
    url: '/admin/statistics2',
    method: 'GET'
  })
}
// 获取订单统计信息
const getStatistics3 = () => {
  return request({
    url: 'admin/statistics3?type=week',
    method: 'GET'
  })
}
// 退出登录接口
const logout = () => {
  return request({
    url: '/admin/logout',
    method: 'POST'
  })
}
export default {
  login,
  getUserInfo,
  getStatistics1,
  getStatistics2,
  getStatistics3,
  logout
}
