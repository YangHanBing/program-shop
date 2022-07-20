<template>
  <div class="box">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all">
        <NavForm
          switch
          :searchForm="searchForm"
          :typeList="typeList"
          @handleSearch="handleSearch"
          @handleReset="handleReset"
        ></NavForm>
      </el-tab-pane>
      <el-tab-pane label="审核中" name="checking">审核中</el-tab-pane>
      <el-tab-pane label="出售中" name="saffing">出售中</el-tab-pane>
      <el-tab-pane label="已下架" name="off">已下架</el-tab-pane>
      <el-tab-pane label="库存预警" name="min_stock">库存预警</el-tab-pane>
      <el-tab-pane label="回收站" name="delete">回收站</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import goodsApi from '@/api/goodsApi'
import { ref, reactive } from 'vue'
import NavForm from '@/components/NavForm'
const activeName = ref('all')
const searchForm = reactive({})
const goodsList = reactive({})
const typeList = reactive({})
// 获取商品列表
const getGoodsList = async () => {
  const res = await goodsApi.getGoodsList({ tab: 'all' })
  goodsList.value = res.list
}
getGoodsList()
console.log(goodsList)
// 获取分类列表
const getTypeList = async () => {
  const res = await goodsApi.getGoodsType()
  typeList.value = res
}
getTypeList()
// tab切换
const handleClick = (tab, event) => {
  console.log(tab, event)
}
// 搜索事件
const handleSearch = () => {}
// 重置事件
const handleReset = () => {}
</script>
<style scoped lang="scss">
.searchSwitch {
  background-color: #f5f7fa;
  color: #409eff;
}
</style>
