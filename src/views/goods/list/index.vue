<template>
  <div class="box">
    <el-tabs v-model="tab" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane v-for="item in goodsNavData" v-bind="item" class="container">
        <NavForm
          switch
          :searchForm="searchForm"
          :typeList="typeList"
          :navFormColumn="navFormColumn.value"
          :NavFormActions="NavFormActions.value"
          @handleRefresh="handleRefresh"
          @handleSearch="handleSearch"
          @handleReset="handleReset"
        ></NavForm>
        <el-table
          ref="multipleTableRef"
          :data="goodsList.value"
          style="width: 100%"
        >
          <el-table-column align="center" type="selection" width="55" />
          <el-table-column label="商品" width="300">
            <template v-slot="scope">
              <div class="goods_box">
                <img :src="scope.row.cover" class="goods_img" />
                <div class="desc">
                  <p>{{ scope.row.title }}</p>
                  <div class="price_box">
                    <p class="price">￥{{ scope.row.min_price }}</p>
                    <p>￥{{ scope.row.min_oprice }}</p>
                  </div>
                  <!-- <p>分类: {{ scope.row.category.name }}</p> -->
                  <p>分类:</p>
                  <p>创建时间: {{ scope.row.create_time }}</p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="实际销量"
            prop="discount"
          ></el-table-column>
          <el-table-column align="center" label="商品状态" prop="status">
            <template v-slot="scope">
              <el-tag v-if="scope.row.status == '0'" type="danger">仓库</el-tag>
              <el-tag v-if="scope.row.status == '1'" type="success"
                >上架</el-tag
              ></template
            >
          </el-table-column>
          <el-table-column align="center" label="审核状态" prop="ischeck">
            <template v-slot="scope">
              <p v-if="scope.row.ischeck == '1'">通过</p>
              <p v-if="scope.row.ischeck == '2'">拒绝</p>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="总库存"
            prop="stock"
          ></el-table-column>
          <el-table-column align="center" label="操作" width="350">
            <div class="action">
              <span>修改</span>
              <span>商品规格</span>
              <span>设置轮播图</span>
              <span>商品详情</span>
              <span>删除</span>
            </div>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="50"
          @current-change="handleCurrentChange"
        />
      </el-tab-pane>
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
  console.log(goodsList.value)
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
  // 获取navform的数据
  const res = goodsNavData.filter((item) => {
    return item.name === tab.props.name
  })
  navFormColumn.value = res[0].navFormColumn
  NavFormActions.value = res[0].NavFormActions
}
// 局部刷新功能
const handleRefresh = () => {
  getAllGoodsList(tab.value)
}
// 搜索事件
const handleSearch = () => {
  alert('handleSearch')
}
// 重置事件
const handleReset = () => {
  alert('handleReset')
}
// 页码改变事件
const handleCurrentChange = (page) => {
  console.log(page)
}
</script>
<style scoped lang="scss">
@import './goods.scss';
</style>
