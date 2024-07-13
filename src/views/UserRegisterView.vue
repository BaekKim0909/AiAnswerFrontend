<script setup lang="ts">
import { ref } from 'vue'
import { userRegisterService } from '@/api/user'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { Message } from '@arco-design/web-vue'
const userStore = useUserStore()
const router = useRouter()
const userRegisterInfo = ref({
  userAccount: '',
  userPassword: '',
  checkedPassword: ''
})
const doRegister = async () => {
  if (userRegisterInfo.value.userPassword !== userRegisterInfo.value.checkedPassword) {
    Message.error('两次输入的密码不一致!')
    return
  }
  const response = await userRegisterService({
    userAccount: userRegisterInfo.value.userAccount,
    userPassword: userRegisterInfo.value.userPassword,
    checkedPassword: userRegisterInfo.value.checkedPassword
  })
  userStore.setToken(response.data)
  await router.push('/user/login')
  Message.success('注册成功!')
}
</script>

<template>
  <div class="registerView">
    <a-row class="grid-demo">
      <a-col :span="4"> </a-col>
      <a-col :span="16">
        <div class="topBar">
          <img class="logo" src="@/assets/Logo.webp" />
          <h1>智能回答网站</h1>
        </div>
        <div class="loginForm">
          <a-form :model="userRegisterInfo" :style="{ width: '500px' }">
            <a-form-item field="UserName" label="用户名:">
              <a-input
                v-model="userRegisterInfo.userAccount"
                placeholder="please enter your username..."
              />
            </a-form-item>
            <a-form-item field="PassWord" label="密码:">
              <a-input
                v-model="userRegisterInfo.userPassword"
                type="password"
                placeholder="please enter your password..."
              />
            </a-form-item>
            <a-form-item field="CheckedPassWord" label="请再次输入:">
              <a-input
                v-model="userRegisterInfo.checkedPassword"
                type="password"
                placeholder="please enter your password again..."
              />
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                :style="{
                  width: '80px',
                  height: '40px',
                  marginLeft: '60px'
                }"
                @click="doRegister"
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
.registerView {
  background-color: #eeeeee;
  height: 100vh;
}
</style>
