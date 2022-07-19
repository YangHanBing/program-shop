<template>
  <div>主控台</div>
</template>
<script setup>
import User from '../api/user'
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
// 进入主页后直接触发的事件
getStatistics1()
getStatistics2()
getStatistics3()
</script>
<style scoped lang="scss"></style>
