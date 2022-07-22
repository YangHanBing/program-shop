import goodsApi from '@/api/goodsApi'
import {
  ref,
  reactive
} from 'vue'
import goodsNavData from '@/views/goods/list/goodsNavData.js'
export default function () {
  const tab = ref('all')
  const page = ref(1)
  const total = ref()
  // 模态框表单
  const dialogForm = reactive({
    unit: '件',
    stock: 100,
    min_stock: 10,
    min_oprice: 0,
    min_price: 0,
    status: 1
  })
  // const rules = reactive([])
  const goodsList = reactive({})
  const typeList = reactive({})
  const navFormColumn = reactive([])
  const NavFormActions = reactive([])
  const drawer = ref(false) // 模态框
  const dialogTitle = ref('新增')
  // 获取默认的全部商品列表
  const getAllGoodsList = async (page, data) => {
    const res = await goodsApi.getGoodsList(page, data)
    total.value = res.totalCount
    goodsList.value = res.list
  }
  // getAllGoodsList(page.value, {
  //   tab: tab.value
  // })
  // 获取分类列表
  const getTypeList = async () => {
    const res = await goodsApi.getGoodsType()
    typeList.value = res
  }
  // getTypeList()
  // 获取默认的全部商品头部
  const getAllGoodsNav = () => {
    const res = goodsNavData.filter((item) => {
      return item.name === 'all'
    })
    navFormColumn.value = res[0].navFormColumn
    NavFormActions.value = res[0].NavFormActions
  }
  // getAllGoodsNav()
  // tab切换
  const handleClick = (tab) => {
    console.log(tab.props.name)
    tab.value = tab.props.name
    // 获取点击的对应商品列表
    getAllGoodsList(page.value, {
      tab: tab.value
    })
    // 获取navform的数据
    const res = goodsNavData.filter((item) => {
      return item.name === tab.props.name
    })
    navFormColumn.value = res[0].navFormColumn
    NavFormActions.value = res[0].NavFormActions
  }
  // 局部刷新功能
  const handleRefresh = () => {
    getAllGoodsList(page.value, {
      tab: tab.value
    })
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
    getAllGoodsList(page.value, {
      tab: tab.value
    })
  }
  // 页码改变事件
  const handleCurrentChange = (pages) => {
    page.value = pages
    getAllGoodsList(page.value, {
      tab: tab.value
    })
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
  const handleOpenDialog = async (action, id) => {
    if (action === 'add') {
      dialogTitle.value = '新增'
      dialogForm.value = {
        unit: '件',
        stock: 100,
        min_stock: 10,
        min_oprice: 0,
        min_price: 0,
        status: 1
      }
    } else if (action === 'edit') {
      dialogTitle.value = '修改'
      // 获取商品信息
      dialogForm.value = await goodsApi.readGoods(id)
    }
    drawer.value = true
  }
  // 获取商品信息
  // const handleReadGoogs = async (id) => {
  //   const res = await goodsApi.readGoods(id)
  //   console.log(res)
  // }
  // 总库存数量改变事件
  const handleStockChange = (value) => {
    dialogForm.stock = value
  }
  // 批量删除事件
  const handleSelectedDel = () => {
    alert('del')
  }
  // 上架事件
  const handleUp = () => {
    alert('up')
  }
  // 下架事件
  const handleDown = () => {}
  // 恢复商品事件
  const handleRecover = () => {}
  // 彻底删除事件
  const handleDelete = () => {}
  // 暴露出去
  return {
    goodsList,
    typeList,
    navFormColumn,
    NavFormActions,
    total,
    drawer,
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
    handleStockChange
  }
}
