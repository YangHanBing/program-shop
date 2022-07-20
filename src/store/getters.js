const getters = {
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  menus: state => state.user.menus,
  isCollapse: state => state.menus.isCollapse,
  tagsview: state => state.tagsview.tagsView
}

export default getters
