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
import User from '../api/user'
import { useStore } from 'vuex'
import AppSide from './AppSide'
import AppNav from './AppNav'
import AppMain from './AppMain'
const store = useStore()
// 获取首页信息1
const getStatistics1 = async () => {
  await User.getStatistics1()
}
// 获取首页信息2
const getStatistics2 = async () => {
  await User.getStatistics2()
}
// 获取首页信息3
const getStatistics3 = async () => {
  await User.getStatistics3()
}
// 获取用户信息
const getUserInfo = () => {
  store.dispatch('user/getUserInfo')
}
// 进入主页后直接触发的事件
getStatistics1()
getStatistics2()
getStatistics3()
getUserInfo()
</script>
<style scoped lang="scss">
.el-header {
  background-color: #4338ca;
  color: #fff;
  height: 60px;
}
.box {
  padding: 0;
  height: calc(100vh - 60px);
  .content {
    background-color: #f3f4f6;
    height: calc(100vh - 60px);
  }
}
</style>
