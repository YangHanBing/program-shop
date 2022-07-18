<template>
  <div class="">safaegeggggg</div>
</template>
<script setup>
import { ElNotification } from 'element-plus'
// 登录成功提示
const toLoginSuccess = () => {
  ElNotification({
    message: '登录成功',
    type: 'success'
  })
}
// 进入主页后直接触发的事件
toLoginSuccess()
</script>
<style scoped lang="scss"></style>
