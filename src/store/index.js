import {
  createStore
} from 'vuex'
import user from './modules/user'
import menus from './modules/menus'
import getters from './getters'
export default createStore({
  getters,
  modules: {
    user,
    menus
  }
})
