import request from '@/utils/request'
// 获取商品列表接口
const getGoodsList = (data) => {
  return request({
    url: '/admin/goods/1',
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
export default {
  getGoodsList,
  getGoodsType
}