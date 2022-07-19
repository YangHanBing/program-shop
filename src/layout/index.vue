<template>
  <el-container>
    <el-header>
      <AppNav>Header</AppNav>
    </el-header>
    <el-main class="box">
      <el-container>
        <el-aside :width="isCollapse ? '65px' : '250px'">
          <AppSide>Main</AppSide>
        </el-aside>
        <el-main class="content">
          <AppMain>
            <router-view></router-view>
          </AppMain>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>
<script setup>
import AppSide from './AppSide'
import AppNav from './AppNav'
import AppMain from './AppMain'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const isCollapse = computed(() => {
  return store.getters.isCollapse
})
</script>
<style scoped lang="scss">
.el-header {
  background-color: #4338ca;
  color: #fff;
  height: 64px;
  padding: 0;
}
.box {
  padding: 0;
  height: calc(100vh - 64px);
  .content {
    background-color: #f3f4f6;
    height: 800px;
    overflow: auto;
  }
}
</style>
