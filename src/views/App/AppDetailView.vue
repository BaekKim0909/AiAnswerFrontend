<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { AppVO } from '@/Model/App'
import { getAppVoByIdService } from '@/api/app'
import { Message } from '@arco-design/web-vue'
import {
  REVIEW_STATUS_MAP,
  APP_TYPE_ENUM,
  APP_TYPE_MAP,
  APP_SCORING_STRATEGY_MAP
} from '@/Model/Enum/app'
import { dayjs } from '@arco-design/web-vue/es/_utils/date'
import { useUserStore } from '@/stores/user'

interface Props {
  id: string
}
const props = withDefaults(defineProps<Props>(), {
  id: () => {
    return ''
  }
})
const data = ref<AppVO>({})
const userStore = useUserStore()
const loginUser = userStore.userInfo
// 是否为本人创建
const isMy = computed(() => {
  return loginUser.userAccount && loginUser.userAccount === data.value.userVo?.userAccount
})
onMounted(() => {
  loadData()
})
//加载数据
const loadData = async () => {
  if (props.id === '') {
    return
  }
  const response = await getAppVoByIdService(props.id)
  if (response.status === 200) {
    data.value = response.data
  } else {
    Message.error('获取数据失败,' + response.data)
  }
}
</script>

<template>
  <div class="AppDetailPage">
    <a-card>
      <a-row class="grid-demo" style="margin-bottom: 16px">
        <a-col flex="auto">
          <h2>{{ data.appName }}</h2>
          <p>{{ data.appDesc }}</p>
          <p>应用类型：{{ APP_TYPE_MAP[data.appType] }}</p>
          <p>评分策略：{{ APP_SCORING_STRATEGY_MAP[data.scoringStrategy] }}</p>
          <p>
            <a-space>
              作者：
              <div :style="{ display: 'flex', alignItems: 'center' }">
                <a-avatar
                  :size="24"
                  :image-url="data.userVo?.userAvatar"
                  :style="{ marginRight: '8px' }"
                />
                <a-typography-text>{{ data.userVo?.userName ?? '无名' }} </a-typography-text>
              </div>
            </a-space>
          </p>
          <p>创建时间：{{ dayjs(data.createTime).format('YYYY-MM-DD HH:mm:ss') }}</p>
          <a-space size="medium">
            <a-button type="primary" :href="`/answer/do/${id}`">开始答题</a-button>
            <a-button>分享应用</a-button>
            <a-button v-if="isMy" :href="`/add/question/${id}`">设置题目 </a-button>
            <a-button v-if="isMy" :href="`/add/scoring_result/${id}`">设置评分 </a-button>
            <a-button v-if="isMy" :href="`/add/app/${id}`">修改应用</a-button>
          </a-space>
        </a-col>
        <a-col flex="400px">
          <a-image width="100%" :src="data.appIcon" />
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<style scoped></style>
