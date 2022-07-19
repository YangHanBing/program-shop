<template>
  <div class="nav">
    <div class="left">
      <img src="@/assets/01.png" class="nav_img" />
    </div>
    <div class="right">
      <div class="right_l">
        <!-- 折叠按钮 -->
        <!-- <el-icon @click="changeMenus" class="hamburger hover-effect">
          <svg-icon v-if="isCollapse" icon="hamburger-opened"></svg-icon>
          <svg-icon v-else icon="hamburger-closed"></svg-icon>
        </el-icon> -->
        <el-icon class="hamburger hover-effect">
          <svg-icon icon="hamburger-opened"></svg-icon>
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
        <el-tooltip effect="dark" content="全屏" placement="bottom">
          <el-icon class="open">
            <svg-icon icon="screenfull"></svg-icon>
          </el-icon>
        </el-tooltip>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <div class="user">
              <img :src="res.avatar" class="avatar" />
              <p>{{ res.username }}</p>
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
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
const store = useStore()
const res = computed(() => {
  return store.getters.userInfo
})
// 刷新事件
const refresh = () => {}
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
  })
    .then(async () => {
      await store.dispatch('user/logout')
      ElMessage({
        type: 'success',
        message: '退出成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消退出'
      })
    })
}
</script>
<style scoped lang="scss">
.nav {
  display: flex;
  align-items: center;
}
.left {
  width: 250px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  .nav_img {
    width: 120px;
    height: 48px;
  }
}
.right {
  height: 64px;
  width: calc(100vw - 250px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding-right: 20px;
  .right_l {
    width: 60px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .hamburger,
    .reloadIcon {
      padding: 24px 14px;
    }
    .hamburger:hover,
    .reloadIcon:hover {
      background-color: #4f46e5;
    }
  }
  .right_r {
    width: 150px;
    height: 64px;
    display: flex;
    align-items: center;
    .open {
      margin-right: 20px;
      padding: 24px 14px;
    }
    .open:hover {
      background-color: #4f46e5;
    }
    .user {
      display: flex;
      align-items: center;
    }
    .avatar {
      width: 25px;
      height: 25px;
      border-radius: 25px;
      margin-right: 5px;
      background-color: #ccc;
    }
    .el-dropdown {
      color: #fff;
    }
  }
}
</style>
