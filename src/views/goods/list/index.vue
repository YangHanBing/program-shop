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
          @selection-change="handleSelectionChange"
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
            <template v-slot="scope">
              <div class="action">
                <!-- {{ scope.row.goods_skus_card }} -->
                <span @click="handleOpenDialog('edit', scope.row.id)"
                  >修改</span
                >
                <span @click="handleOpenSkusDialog(scope.row.id)"
                  >商品规格</span
                >
                <span>设置轮播图</span>
                <span>商品详情</span>
                <el-popconfirm
                  title="是否要删除改商品?"
                  confirm-button-text="确认"
                  cancel-button-text="取消"
                  @confirm="handleSelectedDel(scope.row.id)"
                >
                  <template #reference>
                    <span>删除</span>
                  </template>
                </el-popconfirm>
              </div>
            </template>
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
              :model="dialogForm.value"
              label-width="100px"
              class="demo-ruleForm"
              status-icon
            >
              <el-form-item label="商品名称" prop="title">
                <el-input
                  v-model="dialogForm.value.title"
                  placeholder="请输入商品名称,不超过60个字符"
                ></el-input>
              </el-form-item>
              <el-form-item label="封面" prop="cover">
                <el-upload
                  v-if="dialogTitle == '新增'"
                  class="avatar-uploader"
                  v-model="dialogForm.cover"
                >
                  <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
                <img v-else class="goods_img" :src="dialogForm.value.cover" />
              </el-form-item>
              <el-form-item label="商品分类" prop="category_id">
                <el-select
                  v-model="dialogForm.value.category_id"
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
                  v-model="dialogForm.value.desc"
                  type="textarea"
                  placeholder="选填，商品买点"
                />
              </el-form-item>
              <el-form-item label="单位" prop="unit">
                <el-input v-model="dialogForm.value.unit" class="Company" />
              </el-form-item>
              <el-form-item label="总库存" prop="stock">
                <el-input-number
                  v-model="dialogForm.value.stock"
                  controls-position="right"
                  @change="handleStockChange"
                  :min="0"
                />
                <p class="numdesc">件</p>
              </el-form-item>
              <el-form-item label="库存预警" prop="min_stock">
                <el-input-number
                  v-model="dialogForm.value.min_stock"
                  controls-position="right"
                  @change="handleMinStockChange"
                  :min="0"
                />
                <p class="numdesc">件</p>
              </el-form-item>
              <el-form-item label="最低销售价" prop="min_oprice">
                <el-input-number
                  v-model="dialogForm.value.min_oprice"
                  controls-position="right"
                  :min="0"
                  @change="handleMinOpriceChange"
                />
                <p class="numdesc">元</p>
              </el-form-item>
              <el-form-item label="最低原价" prop="min_price">
                <el-input-number
                  v-model="dialogForm.value.min_price"
                  controls-position="right"
                  :min="0"
                  @change="handleMinPriceChange"
                />
                <p class="numdesc">元</p>
              </el-form-item>
              <el-form-item label="库存显示" prop="status">
                <el-radio-group v-model="dialogForm.value.status">
                  <el-radio :label="0">隐藏</el-radio>
                  <el-radio :label="1">显示</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否上架" prop="stock_display">
                <el-radio-group v-model="dialogForm.value.stock_display">
                  <el-radio :label="0">放入仓库</el-radio>
                  <el-radio :label="1">立即上架</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleAddOk">提交</el-button>
                <el-button @click="handleAddClose">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-drawer>
        <!-- 选择规格模态框 -->
        <DialogForm
          :dialogVisible="dialogSkus"
          :title="dialogSkusTitle"
          :addInfo="addInfo"
          :dialogFormColumn="dialogSkusFormColumn"
          @handleClose="handleSkusClose"
          @handleAddOk="handleSkusOk"
        ></DialogForm>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import NavForm from '@/components/NavForm'
import DialogForm from '@/components/DialogForm'
import goodsNavData from './goodsNavData.js'
import { Plus } from '@element-plus/icons-vue'
import mixins from '@/mixins/goods.js'
const dialogSkusFormColumn = reactive([
  {
    type: 'input',
    prop: 'name',
    label: '商品名称'
  },
  {
    type: 'input',
    prop: 'code',
    label: '商品编码'
  }
])
const addInfo = reactive({})
const {
  goodsList,
  typeList,
  navFormColumn,
  NavFormActions,
  total,
  drawer,
  dialogSkus,
  dialogForm,
  dialogTitle,
  getAllGoodsList,
  getTypeList,
  getAllGoodsNav,
  handleClick,
  handleRefresh,
  handleSearch,
  handleReset,
  handleCurrentChange,
  handleNavFormAction,
  handleOpenDialog,
  handleAddOk,
  handleAddClose,
  handleSelectedDel,
  handleSelectionChange,

  handleStockChange,
  handleMinStockChange,
  handleMinOpriceChange,
  handleMinPriceChange,
  handleOpenSkusDialog,
  handleSkusClose,
  handleSkusOk
} = mixins()
const tab = ref('all')
const page = ref(1)
const searchForm = reactive({
  title: '',
  category_id: ''
})
const dialogSkusTitle = ref('设置商品规格')
// 获取默认的全部商品列表
getAllGoodsList(page.value, { tab: tab.value })
// 获取分类列表
getTypeList()
// 获取默认的全部商品头部
getAllGoodsNav()
</script>
<style scoped lang="scss">
@import './goods.scss';
</style>
