<template>
  <el-menu
    :default-active="$route.path"
    :unique-opened="true"
    :collapse="isCollapse"
    :collapse-transition="false"
    router
  >
    <menusTree
      v-for="(item, index) in menusList"
      :item="item"
      :key="index"
    ></menusTree>
  </el-menu>
</template>
<script setup>
import menusTree from './menusTree'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const menusList = computed(() => {
  const menusList = store.getters.menus
  return menusList
})
const isCollapse = computed(() => {
  return store.getters.isCollapse
})
</script>
<style scoped lang="scss">
.el-menu {
  border-right: none;
}
</style>
