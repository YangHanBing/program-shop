import request from '@/utils/request'
// 获取商品列表接口
const getGoodsList = (page, data) => {
  return request({
    url: `/admin/goods/${page}`,
    method: 'GET',
    data
  })
}
// 获取商品分类接口
const getGoodsType = () => {
  return request({
    url: '/admin/category',
    method: 'GET'
  })
}
// 新增商品接口
const addGoods = (data) => {
  return request({
    url: '/admin/goods',
    method: 'POST',
    data
  })
}
// 删除和批量删除接口
const delGoods = (data) => {
  return request({
    url: '/goods/delete_all',
    method: 'POST',
    data
  })
}
// 修改接口(禁止修改)
const editGoods = (id, data) => {
  return request({
    url: `/admin/goods/${id}`,
    method: 'POST',
    data
  })
}
// 上架,下架接口
const changeStatusGoods = (data) => {
  return request({
    url: '/goods/changestatus',
    method: 'POST',
    data
  })
}
// 获取商品信息 /admin/goods/read/48
const readGoods = (data) => {
  return request({
    url: '/admin/goods/read',
    method: 'GET',
    data
  })
}
// 更新商品规格 /admin/goods/updateskus/48
const updateskusGoods = (id, data) => {
  return request({
    url: `/admin/goods/updateskus/${id}`,
    method: 'POST',
    data
  })
}
// 设置商品轮播图接口 /admin/goods/banners/134
const bannerGoods = (id, data) => {
  return request({
    url: `/admin/goods/banners/${id}`,
    method: 'POST',
    data
  })
}
// 商品详情·接口 /admin/goods/134
const descGoods = (id, data) => {
  return request({
    url: `/admin/goods/${id}`,
    method: 'POST',
    data
  })
}
// 恢复商品接口
const restoreGoods = (data) => {
  return request({
    url: '/admin/goods/restore',
    method: 'POST',
    data
  })
}
// 彻底删除接口
const destroyGoods = (data) => {
  return request({
    url: 'admin/goods/destroy',
    method: 'POST',
    data
  })
}
export default {
  getGoodsList,
  getGoodsType,
  addGoods,
  delGoods,
  editGoods,
  changeStatusGoods,
  readGoods,
  updateskusGoods,
  bannerGoods,
  descGoods,

  restoreGoods,
  destroyGoods
}
