import {
  getItem,
  removeItem,
  setItem
} from '../../utils/storage'
import User from '../../api/user'
import router from '../../router'
export default {
  namespaced: true,
  state: {
    token: getItem('token') || '',
    userInfo: '',
    menus: '',
    ruleNames: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    },
    // 将用户信息存到vuex
    setUserInfo(state, userInfo) {
      const avatar = userInfo.avatar
      const username = userInfo.username
      state.userInfo = {
        avatar,
        username
      }
      state.menus = userInfo.menus
      state.ruleNames = userInfo.ruleNames
    }
  },
  actions: {
    // 调用登录接口
    async login({
      commit
    }, payload) {
      const res = await User.login(payload)
      commit('setToken', res.token)
      router.push('/')
      return res
    },
    // 获取用户信息
    async getUserInfo({
      commit
    }) {
      const res = await User.getUserInfo()
      commit('setUserInfo', res)
      return res
    },
    // 退出登录
    async logout({
      commit
    }) {
      await User.logout()
      // commit('setToken', '')
      // commit('setUserInfo', '')
      removeItem('token')
      removeItem('tagsview')
      router.push('/login')
      // 想清空vuex中的数据，让页面重新加载就行了
      window.location.reload()
    }
  }
}
