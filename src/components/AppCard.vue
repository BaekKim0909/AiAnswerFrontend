<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Prop } from 'vue'
import type { AppVO } from '@/Model/App'
interface Props {
  app: AppVO
}
const props = withDefaults(defineProps<Props>(), {
  app: () => {
    return {}
  }
})
const router = useRouter()
const doCardClick = () => {
  router.push(`/app/detail/${props.app.id}`)
}
</script>

<template>
  <a-card class="appCard" @click="doCardClick">
    <template #cover>
      <div
        :style="{
          height: '204px',
          overflow: 'hidden'
        }"
      >
        <img
          :style="{ width: '100%', transform: 'translateY(-20px)', objectFit: 'contain' }"
          alt="dessert"
          :src="app.appIcon"
        />
      </div>
    </template>
    <a-card-meta :title="app.appName" :description="app.appDesc">
      <template #avatar>
        <div :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }">
          <a-avatar :size="24" :style="{ marginRight: '8px' }">
            <img alt="avatar" :src="app.userVo?.userAvatar" :style="{ objectFit: 'cover' }" />
          </a-avatar>
          <a-typography-text>{{ app.userVo?.userName }}</a-typography-text>
        </div>
      </template>
    </a-card-meta>
  </a-card>
</template>

<style scoped>
.appCard {
  cursor: pointer;
}
</style>
