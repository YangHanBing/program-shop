<template>
  <div id="app">
    <el-row>
      <el-col :span="16" class="left">
        <div class="title">欢迎光临</div></el-col
      >
      <el-col :span="8" class="right">
        <div class="box">
          <h2>欢迎回来</h2>
          <div class="placehold">
            <span></span>
            <p>账号密码登录</p>
            <span></span>
          </div>
          <el-form
            ref="loginForm"
            :model="loginInfo"
            :rules="rules"
            class="demo-ruleForm"
          >
            <el-form-item prop="username">
              <el-input
                :prefix-icon="User"
                v-model="loginInfo.username"
                placeholder="请输入用户名"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                :prefix-icon="Lock"
                v-model="loginInfo.password"
                placeholder="请输入密码"
              />
            </el-form-item>
            <el-form-item>
              <div class="loginBtn" @click="handleLoginSubmit">登录</div>
            </el-form-item>
          </el-form>
        </div></el-col
      >
    </el-row>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useStore } from 'vuex'
import { ElNotification } from 'element-plus'
const store = useStore()
const loginInfo = reactive({
  password: 'admin',
  username: 'admin'
})
const rules = reactive({
  username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
})
const loginForm = ref(null)
// 登录事件
const handleLoginSubmit = () => {
  loginForm.value.validate(async (valid) => {
    if (valid) {
      store.dispatch('user/login', loginInfo)
      ElNotification({
        message: '登录成功',
        type: 'success'
      })
    }
  })
}
</script>
<style scoped lang="scss">
.el-row {
  width: 100%;
  height: 100%;
  .left {
    background-color: #6366f1;
    display: flex;
    align-items: center;
    justify-content: center;
    .title {
      font-size: 48px;
      font-weight: 700;
      color: #fff;
    }
  }
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
    .box {
      height: 300px;
      width: 250px;
      text-align: center;
      h2 {
        font-size: 30px;
        font-weight: 700;
      }
      .placehold {
        margin: 30px 0 20px 0;
        color: #ccc;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          display: inline-block;
          width: 60px;
          height: 1px;
          background-color: #ccc;
        }
      }
      .loginBtn {
        width: 250px;
        background-color: #626aef;
        border-radius: 25px;
        color: #fff;
      }
    }
  }
}
</style>
