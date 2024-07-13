<script setup lang="ts">
import { routes } from '@/router/routes'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import checkAccess from '@/access/checkAccess'
import { type userVO, useUserStore } from '@/stores/user'
import ACCESS_ENUM from '@/access/accessEnum'

const router = useRouter()
const userStore = useUserStore()
//展示的导航栏
const visibleroutes = computed(() => {
  return routes.filter((item) => {
    if (item.meta?.hideInMenu) {
      return false
    }
    //
    if (!checkAccess(userStore.userInfo, item.meta?.access as string)) {
      return false
    }

    return true
  })
})
//doOption
//去登录页
const toLoginView = () => {
  router.push('/user/login')
}
//注销用户
const clearUser = () => {
  userStore.setToken('')
  userStore.setUserInfo({
    userRole: ACCESS_ENUM.NOT_LOGIN
  } as userVO)
  location.reload()
}
//去用户信息页
const toUserInfoView = () => {
  router.push('/user/userInfo')
}
//当前导航栏选中项
const selectedKeys = ref(['/'])

router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path]
})
const doMenuClick = (path: string) => {
  router.push({
    path: path
  })
}
</script>

<template>
  <a-row class="grid-demo" style="margin-bottom: 16px" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu mode="horizontal" :selected-keys="selectedKeys" @menu-item-click="doMenuClick">
        <a-menu-item key="0" disabled>
          <div class="titleBar">
            <img class="logo" src="@/assets/Logo.webp" />
            <div class="title">Answer</div>
          </div>
        </a-menu-item>
        <a-menu-item
          v-for="item in visibleroutes"
          :key="item.path"
          :style="{
            fontSize: '18px'
          }"
          >{{ item.name }}</a-menu-item
        >
      </a-menu>
    </a-col>
    <a-col flex="200px">
      <a-dropdown position="bottom" trigger="hover">
        <a-avatar :size="55">
          <img alt="avatar" :src="userStore.userInfo?.userAvatar" />
        </a-avatar>
        <template #content>
          <a-doption @click="toLoginView">登录</a-doption>
          <a-doption @click="clearUser">注销</a-doption>
          <a-doption @click="toUserInfoView">个人信息</a-doption>
        </template>
      </a-dropdown>
    </a-col>
  </a-row>
</template>

<style scoped>
.titleBar {
  display: flex;
  align-items: center;
}
.logo {
  height: 48px;
  border-radius: 10px;
}
.title {
  margin-left: 10px;
  color: darkslateblue;
  font-size: 28px;
}
</style>
