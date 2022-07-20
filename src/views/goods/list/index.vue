<template>
  <div class="box">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all">
        <NavForm
          switch
          :searchForm="searchForm"
          :typeList="typeList"
          :navFormColumn="navFormColumn"
          :NavFormActions="NavFormActions"
          ref="handleSearch"
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
import goodsData from './goodsData.js'
console.log(goodsData)
const activeName = ref('all')
const searchForm = reactive({
  title: '',
  category_id: ''
})
const goodsList = reactive({})
const typeList = reactive({})
const navFormColumn = reactive([
  {
    type: 'input',
    label: '关键词',
    class: 'searchname',
    size: 'small',
    placeholder: '商品名称',
    prop: 'title'
  },
  {
    type: 'select',
    label: '商品分类',
    size: 'small',
    placeholder: '请选择商品分类',
    prop: 'category_id',
    cateType: typeList
  }
])
const NavFormActions = reactive([
  {
    size: 'small',
    type: 'primary',
    title: '新增'
  },
  {
    size: 'small',
    type: 'danger',
    title: '批量删除'
  },
  {
    size: 'small',
    title: '上架'
  },
  {
    size: 'small',
    title: '下架'
  }
])
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
const handleSearch = () => {
  console.log('000')
}
// 重置事件
const handleReset = () => {}
</script>
<style scoped lang="scss">
.searchSwitch {
  background-color: #f5f7fa;
  color: #409eff;
}
</style>
