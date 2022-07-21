<template>
  <div class="box">
    <el-tabs v-model="tab" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane v-for="item in goodsNavData" v-bind="item">
        <NavForm
          switch
          :searchForm="searchForm"
          :typeList="typeList"
          :navFormColumn="navFormColumn.value"
          :NavFormActions="NavFormActions.value"
          @handleSearch="handleSearch"
          @handleReset="handleReset"
        ></NavForm
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import goodsApi from '@/api/goodsApi'
import { ref, reactive } from 'vue'
import NavForm from '@/components/NavForm'
import goodsNavData from './goodsNavData.js'
const tab = ref('all')
const searchForm = reactive({
  title: '',
  category_id: ''
})
const goodsList = reactive({})
const typeList = reactive({})
const navFormColumn = reactive([])
const NavFormActions = reactive([])
// 获取默认的全部商品列表
const getAllGoodsList = async (tab) => {
  const res = await goodsApi.getGoodsList({ tab: tab })
  goodsList.value = res.list
  console.log(goodsList)
}
getAllGoodsList(tab.value)
// 获取分类列表
const getTypeList = async () => {
  const res = await goodsApi.getGoodsType()
  typeList.value = res
}
getTypeList()
// 获取默认的全部商品头部
const getAllGoodsNav = () => {
  const res = goodsNavData.filter((item) => {
    return item.name === 'all'
  })
  navFormColumn.value = res[0].navFormColumn
  NavFormActions.value = res[0].NavFormActions
}
getAllGoodsNav()
// tab切换
const handleClick = (tab) => {
  console.log(tab.props.name)
  tab.value = tab.props.name
  // 获取点击的对应商品列表
  getAllGoodsList(tab.value)
  const res = goodsNavData.filter((item) => {
    return item.name === tab.props.name
  })
  navFormColumn.value = res[0].navFormColumn
  NavFormActions.value = res[0].NavFormActions
}
// 搜索事件
const handleSearch = () => {
  alert('handleSearch')
}
// 重置事件
const handleReset = () => {
  alert('handleReset')
}
</script>
<style scoped lang="scss">
.searchSwitch {
  background-color: #f5f7fa;
  color: #409eff;
}
</style>
