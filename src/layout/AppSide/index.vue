<template>
  <div class="sidebar">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      router
      unique-opened
    >
      <el-sub-menu :index="route.path">
        <template #title
          ><el-icon><Orange /></el-icon>后台面板</template
        >
        <el-menu-item index="/index"
          ><el-icon><HomeFilled /></el-icon>主控台</el-menu-item
        >
      </el-sub-menu>
      <el-sub-menu>
        <template #title
          ><el-icon><Goods /></el-icon>商品管理</template
        >
        <el-menu-item index="/sys/goods"
          ><el-icon><ShoppingCartFull /></el-icon>商品管理</el-menu-item
        >
        <el-menu-item index="/sys/type"
          ><el-icon><Grid /></el-icon>分类管理</el-menu-item
        >
        <el-menu-item index="/sys/Specifications"
          ><el-icon><Sunset /></el-icon>规格管理</el-menu-item
        >
        <el-menu-item index="/sys/coupon"
          ><el-icon><HomeFilled /></el-icon>优惠卷管理</el-menu-item
        >
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const store = useStore()
const menus = computed(() => {
  return store.getters.menus
})
console.log(menus)
</script>
<style scoped lang="scss">
.el-menu-vertical-demo {
  border-right: none;
}
</style>
