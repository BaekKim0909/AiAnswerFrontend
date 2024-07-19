<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import type { AppAddRequest, AppVO } from '@/Model/App'
import { addAppService, getAppVoByIdService, updateAppService } from '@/api/app'
import { Message } from '@arco-design/web-vue'
import { APP_SCORING_STRATEGY_MAP, APP_TYPE_MAP } from '@/Model/Enum/app'

interface Props {
  id: string
}

const props = withDefaults(defineProps<Props>(), {
  id: () => {
    return ''
  }
})
const router = useRouter()

const form = ref({
  appDesc: '',
  appIcon: '',
  appName: '',
  appType: 0,
  scoringStrategy: 0
} as AppAddRequest)

const oldApp = ref<AppVO>()

/**
 * 加载数据
 */
const loadData = async () => {
  if (!props.id) {
    return
  }
  const res = await getAppVoByIdService(props.id)
  if (res.status === 200 && res.data) {
    oldApp.value = res.data
    form.value = res.data
  } else {
    Message.error('获取数据失败，' + res.data)
  }
}

// 获取旧数据
watchEffect(() => {
  loadData()
})

/**
 * 提交
 */
const handleSubmit = async () => {
  let res: any
  // 如果是修改
  if (props.id) {
    res = await updateAppService({
      id: props.id,
      ...form.value
    })
  } else {
    // 创建
    res = await addAppService(form.value)
  }
  if (res.status === 200) {
    Message.success('操作成功，即将跳转到应用详情页')
    setTimeout(() => {
      router.push(`/app/detail/${props.id ?? res.data}`)
    }, 3000)
  } else {
    Message.error('操作失败，' + res.data)
  }
}
</script>

<template>
  <div id="addAppPage">
    <h2 style="margin-bottom: 32px">创建应用</h2>
    <a-form
      :model="form"
      :style="{ width: '480px' }"
      label-align="left"
      auto-label-width
      @submit="handleSubmit"
    >
      <a-form-item field="appName" label="应用名称">
        <a-input v-model="form.appName" placeholder="请输入应用名称" />
      </a-form-item>
      <a-form-item field="appDesc" label="应用描述">
        <a-input v-model="form.appDesc" placeholder="请输入应用描述" />
      </a-form-item>
      <a-form-item field="appIcon" label="应用图标">
        <a-input v-model="form.appIcon" placeholder="请输入应用图标" />
      </a-form-item>

      <a-form-item field="appType" label="应用类型">
        <a-select v-model="form.appType" :style="{ width: '320px' }" placeholder="请选择应用类型">
          <a-option v-for="(value, key) of APP_TYPE_MAP" :value="Number(key)" :label="value" />
        </a-select>
      </a-form-item>
      <a-form-item field="scoringStrategy" label="评分策略">
        <a-select
          v-model="form.scoringStrategy"
          :style="{ width: '320px' }"
          placeholder="请选择评分策略"
        >
          <a-option
            v-for="(value, key) of APP_SCORING_STRATEGY_MAP"
            :value="Number(key)"
            :label="value"
          />
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px"> 提交 </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped></style>
