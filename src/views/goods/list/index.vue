<template>
  <div class="box">
    <el-tabs v-model="tab" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane v-for="item in goodsNavData" v-bind="item" class="container">
        <NavForm
          switch
          :searchForm="searchForm"
          :typeList="typeList"
          :navFormColumn="navFormColumn.value"
          ref="navForm"
          :NavFormActions="NavFormActions.value"
          @handleRefresh="handleRefresh"
          @handleSearch="handleSearch"
          @handleReset="handleReset"
          @handleNavFormAction="handleNavFormAction"
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
          <el-table-column
            align="center"
            v-if="tab != 'delete'"
            label="审核状态"
            prop="ischeck"
          >
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
          <el-table-column
            align="center"
            label="操作"
            v-if="tab != 'delete'"
            width="350"
          >
            <div class="action">
              <span @click="handleOpenDialog('edit')">修改</span>
              <span>商品规格</span>
              <span>设置轮播图</span>
              <span>商品详情</span>
              <span>删除</span>
            </div>
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            v-if="tab == 'delete'"
            width="350"
          >
            <p>暂无操作</p>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        />
        <el-drawer v-model="drawer" :title="dialogTitle" size="45%">
          <div>
            <el-form
              ref="ruleFormRef"
              :model="dialogForm"
              :rules="rules"
              label-width="100px"
              class="demo-ruleForm"
              status-icon
            >
              <el-form-item label="商品名称" prop="title">
                <el-input
                  v-model="dialogForm.title"
                  placeholder="请输入商品名称,不超过60个字符"
                />
              </el-form-item>
              <el-form-item label="封面" prop="cover">
                <el-upload class="avatar-uploader" v-model="dialogForm.cover">
                  <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
              </el-form-item>

              <el-form-item label="商品分类" prop="category_id">
                <el-select
                  v-model="dialogForm.category_id"
                  placeholder="选择所属商品分类"
                >
                  <el-option
                    v-for="(item, index) in typeList.value"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="商品描述" prop="desc">
                <el-input
                  v-model="dialogForm.desc"
                  type="textarea"
                  placeholder="选填，商品买点"
                />
              </el-form-item>
              <el-form-item label="单位" prop="unit">
                <el-input v-model="dialogForm.unit" class="Company" />
              </el-form-item>
              <el-form-item label="总库存" prop="stock">
                <el-input-number
                  v-model="dialogForm.stock"
                  controls-position="right"
                  @change="handleChange"
                  :min="0"
                />
                <p class="numdesc">件</p>
              </el-form-item>
              <el-form-item label="库存预警" prop="min_stock">
                <el-input-number
                  v-model="dialogForm.min_stock"
                  controls-position="right"
                  :min="0"
                />
                <p class="numdesc">件</p>
              </el-form-item>
              <el-form-item label="最低销售价" prop="min_oprice">
                <el-input-number
                  v-model="dialogForm.min_oprice"
                  controls-position="right"
                  :min="0"
                />
                <p class="numdesc">元</p>
              </el-form-item>
              <el-form-item label="最低原价" prop="min_price">
                <el-input-number
                  v-model="dialogForm.min_price"
                  controls-position="right"
                  :min="0"
                />
                <p class="numdesc">元</p>
              </el-form-item>
              <el-form-item label="库存显示" prop="status">
                <el-radio-group v-model="dialogForm.status">
                  <el-radio :label="0">隐藏</el-radio>
                  <el-radio :label="1">显示</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">提交</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-drawer>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import goodsApi from '@/api/goodsApi'
import { ref, reactive } from 'vue'
import NavForm from '@/components/NavForm'
import goodsNavData from './goodsNavData.js'
import { Plus } from '@element-plus/icons-vue'

const tab = ref('all')
const page = ref(1)
const total = ref(20)
const searchForm = reactive({
  title: '',
  category_id: ''
})
const goodsList = reactive({})
const typeList = reactive({})
const navFormColumn = reactive([])
const NavFormActions = reactive([])
const drawer = ref(false) // 模态框
const dialogTitle = ref('新增')
// 模态框表单
const dialogForm = reactive({
  unit: '件',
  stock: 100,
  min_stock: 10,
  min_oprice: 0,
  min_price: 0,
  status: 1
})
const rules = reactive([])
// 获取默认的全部商品列表
const getAllGoodsList = async (page, data) => {
  const res = await goodsApi.getGoodsList(page, data)
  total.value = res.totalCount
  goodsList.value = res.list
}
getAllGoodsList(page.value, { tab: tab.value })
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
  getAllGoodsList(page.value, { tab: tab.value })
  // 获取navform的数据
  const res = goodsNavData.filter((item) => {
    return item.name === tab.props.name
  })
  navFormColumn.value = res[0].navFormColumn
  NavFormActions.value = res[0].NavFormActions
}
// 局部刷新功能
const handleRefresh = () => {
  getAllGoodsList(page.value, { tab: tab.value })
}
// 搜索事件
const handleSearch = (row) => {
  if (row.title && row.category_id) {
    getAllGoodsList(page.value, {
      tab: tab.value,
      title: row.title,
      category_id: row.category_id
    })
  } else if (row.title && !row.category_id) {
    getAllGoodsList(page.value, {
      tab: tab.value,
      title: row.title
    })
  } else if (!row.title && row.category_id) {
    getAllGoodsList(page.value, {
      tab: tab.value,
      category_id: row.category_id
    })
  } else if (!row.title && !row.category_id) {
    getAllGoodsList(page.value, {
      tab: tab.value
    })
  }
}
// 重置事件
const handleReset = () => {
  getAllGoodsList(page.value, { tab: tab.value })
}
// 页码改变事件
const handleCurrentChange = (pages) => {
  page.value = pages
  getAllGoodsList(page.value, { tab: tab.value })
}
// 头部表单事件
const handleNavFormAction = (action) => {
  if (action === 'add') return handleOpenDialog('add')
  if (action === 'del') return handleSelectedDel()
  if (action === 'up') return handleUp()
  if (action === 'down') return handleDown()
  if (action === 'delete') return handleDelete()
  if (action === 'recover') return handleRecover()
}
// 打开模态框事件
const handleOpenDialog = (action) => {
  if (action === 'add') {
    dialogTitle.value = '新增'
  } else if (action === 'edit') {
    dialogTitle.value = '修改'
  }
  drawer.value = true
}
// 数量改变事件
const handleChange = () => {}
// 批量删除事件
const handleSelectedDel = () => {}
// 上架事件
const handleUp = () => {}
// 下架事件
const handleDown = () => {}
// 恢复商品事件
const handleRecover = () => {}
// 彻底删除事件
const handleDelete = () => {}
</script>
<style scoped lang="scss">
@import './goods.scss';
</style>
