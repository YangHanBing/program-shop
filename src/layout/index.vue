<template>
  <el-container>
    <el-header>
      <AppNav>Header</AppNav>
    </el-header>
    <el-main class="box">
      <el-container>
        <el-aside width="250px">
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
