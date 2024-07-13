<script setup lang="ts">
import { ref } from 'vue'
import { userLoginService, userRegisterService } from '@/api/user'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { Message } from '@arco-design/web-vue'
const userStore = useUserStore()
const router = useRouter()
const userLoginInfo = ref({
  userAccount: '',
  userPassword: ''
})
const doLogin = async () => {
  const response = await userLoginService({
    userAccount: userLoginInfo.value.userAccount,
    userPassword: userLoginInfo.value.userPassword
  })
  userStore.setToken(response.data)
  await userStore.fetchUserInfo()
  await router.push('/')
  Message.success('登录成功!')
}
const toRegister = async () => {
  await router.push('/user/register')
}
</script>

<template>
  <div class="loginView">
    <a-row class="grid-demo">
      <a-col :span="4"> </a-col>
      <a-col :span="16">
        <div class="topBar">
          <img class="logo" src="@/assets/Logo.webp" />
          <h1>智能回答网站</h1>
        </div>
        <div class="loginForm">
          <a-form :model="userLoginInfo" :style="{ width: '500px' }">
            <a-form-item field="UserName" label="用户名">
              <a-input
                v-model="userLoginInfo.userAccount"
                placeholder="please enter your username..."
              />
            </a-form-item>
            <a-form-item field="PassWord" label="密码">
              <a-input
                v-model="userLoginInfo.userPassword"
                type="password"
                placeholder="please enter your password..."
              />
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                :style="{
                  width: '80px',
                  height: '40px',
                  marginRight: '60px'
                }"
                @click="doLogin"
                >登录</a-button
              >
              <a-button
                type="primary"
                :style="{
                  width: '80px',
                  height: '40px'
                }"
                status="success"
                @click="toRegister"
                >注册</a-button
              >
            </a-form-item>
          </a-form>
        </div>
      </a-col>
      <a-col :span="4"> </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.topBar {
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo {
  width: 60px;
  border-radius: 10px;
  margin-right: 20px;
}
.loginForm {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}
.loginView {
  background-color: #eeeeee;
  height: 100vh;
}
</style>
