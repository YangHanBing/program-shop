import {
  setItem,
  getItem
} from '../../utils/storage'
export default {
  namespaced: true,
  state: {
    tagsView: getItem('tagsView') || [{
      title: '主控台',
      path: '/'
    }]
  },
  mutations: {
    setTagsView(state, tagsView) {
      const isSame = state.tagsView.find(item => item.path === tagsView.path)
      if (!isSame) {
        state.tagsView.push(tagsView)
        setItem('tagsview', state.tagsView)
      }
    },
    removeTagsView(state) {
      setItem('tagsview', state.tagsView)
    },
    delTagaOther(state) {
      alert('关闭其它')
    },
    delTagsAll(state) {
      state.tagsView = [{
        title: '主控台',
        path: '/'
      }]
    }
  },
  actions: {

  }
}
