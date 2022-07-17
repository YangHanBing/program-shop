import {
  getItem,
  setItem
} from '../../utils/storage'
import User from '../../api/user'
export default {
  namespaced: true,
  state: {
    token: getItem('token') || ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    }
  },
  actions: {
    async login({
      commit
    }, payload) {
      const res = await User.login(payload)
      console.log(res)
      // if (res.msg === 'ok') {
      //   commit('setToken', res.data.token)
      // }
      return res
    }
  }
}
