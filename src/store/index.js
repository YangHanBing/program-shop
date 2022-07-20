import {
  createStore
} from 'vuex'
import user from './modules/user'
import menus from './modules/menus'
import tagsview from './modules/tagsview'
import getters from './getters'
export default createStore({
  getters,
  modules: {
    user,
    menus,
    tagsview
  }
})
