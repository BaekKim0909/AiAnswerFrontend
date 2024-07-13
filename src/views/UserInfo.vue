<script setup lang="ts">
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
const userInfo = userStore.userInfo
</script>

<template>
  <div>昵称：{{ userInfo.userName }}</div>
  <div>账号：{{ userInfo.userAccount ?? '未登录' }}</div>
</template>

<style scoped></style>
