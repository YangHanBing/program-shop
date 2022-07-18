<template>
  <div class="nav">
    <div class="left">
      <img src="@/assets/01.png" class="nav_img" />
    </div>
    <div class="right">
      <div class="right_l">
        <el-icon><Fold /></el-icon>
        <el-icon><Refresh /></el-icon>
      </div>
      <div class="right_r">
        <el-icon class="open"><FullScreen /></el-icon>
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
const store = useStore()
const res = computed(() => {
  return store.getters.userInfo
})
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
  .right_l {
    width: 100px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .right_r {
    width: 150px;
    height: 64px;
    display: flex;
    align-items: center;
    .open {
      margin-right: 30px;
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
