<template>
  <div class="nav">
    <div class="left">
      <img src="@/assets/01.png" class="nav_img" />
    </div>
    <div class="right">
      <div class="right_l">
        <!-- 折叠按钮 -->
        <el-icon @click="changeMenus" class="hamburger hover-effect">
          <svg-icon v-if="isCollapse" icon="hamburger-opened"></svg-icon>
          <svg-icon v-else icon="hamburger-closed"></svg-icon>
        </el-icon>
        <!-- 刷新按钮 -->
        <el-tooltip effect="dark" content="刷新" placement="bottom">
          <el-icon @click="refresh" class="reloadIcon hover-effect">
            <svg-icon icon="reload"></svg-icon>
          </el-icon>
        </el-tooltip>
      </div>
      <div class="right_r">
        <!-- 全屏 -->
        <screenFull class="screen hover-effect"></screenFull>
        <!-- 头部下拉事件 -->
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <div class="user">
              <img :src="userInfo.avatar" class="avatar" />
              <p>{{ userInfo.username }}</p>
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </div>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="editPassword"
                >修改密码</el-dropdown-item
              >
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import { ElMessageBox } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import screenFull from '@/components/screenFull'
const store = useStore()
const userInfo = computed(() => {
  return store.getters.userInfo
})
// 获取折叠状态
const isCollapse = computed(() => {
  return store.getters.isCollapse
})
// 折叠事件
const changeMenus = () => {
  store.commit('menus/setIsCollapse')
}
// 刷新事件
const refresh = () => {
  location.reload()
}
// 功能事件
const handleCommand = (command) => {
  switch (command) {
    case 'editPassword':
      handleEditPassword()
      break
    case 'logout':
      handleLogout()
      break
  }
}
const handleEditPassword = () => {
  alert('修改密码')
}
// 退出登录事件
const handleLogout = () => {
  ElMessageBox.confirm('是否要退出登录？', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await store.dispatch('user/logout')
  })
}
</script>
<style scoped lang="scss">
@import './styles/AppNav.scss';
</style>
