<script setup lang="ts">
import { computed, defineProps, reactive, ref, watchEffect, withDefaults } from 'vue'
import { useRouter } from 'vue-router'
import message from '@arco-design/web-vue/es/message'
import type { AppVO } from '@/Model/App'
import type { QuestionContentDTO } from '@/Model/Question'
import { getAppVoByIdService } from '@/api/app'
import { getQuestionVoService } from '@/api/question'
import { addUserAnswerService } from '@/api/userAnswer'
import type { UserAnswerAddRequest } from '@/Model/UserAnswer'

interface Props {
  appId: string
}

const props = withDefaults(defineProps<Props>(), {
  appId: () => {
    return ''
  }
})

const router = useRouter()

const app = ref<AppVO>({})
// 题目内容结构（理解为题目列表）
const questionContent = ref<QuestionContentDTO[]>([])

// 当前题目的序号（从 1 开始）
const current = ref(1)
// 当前题目
const currentQuestion = ref<QuestionContentDTO>({})
// 当前题目选项
const questionOptions = computed(() => {
  return currentQuestion.value?.options
    ? currentQuestion.value.options.map((option) => {
        return {
          label: `${option.key}. ${option.value}`,
          value: option.key
        }
      })
    : []
})
// 当前答案
const currentAnswer = ref<string>()
// 回答列表
const answerList = reactive<string[]>([])

/**
 * 加载数据
 */
const loadData = async () => {
  if (!props.appId) {
    return
  }
  // 获取 app
  let res: any = await getAppVoByIdService(props.appId)
  if (res.status === 200) {
    app.value = res.data as any
  } else {
    message.error('获取应用失败，' + res.data)
  }
  // 获取题目
  res = await getQuestionVoService(props.appId)
  if (res.status === 200 && res.data) {
    questionContent.value = res.data.questionContent
  } else {
    message.error('获取题目失败，' + res.message)
  }
}

// 获取旧数据
watchEffect(() => {
  loadData()
})

// 改变 current 题号后，会自动更新当前题目和答案
watchEffect(() => {
  currentQuestion.value = questionContent.value[current.value - 1]
  currentAnswer.value = answerList[current.value - 1]
})

/**
 * 选中选项后，保存选项记录
 * @param value
 */
const doRadioChange = (value: string) => {
  answerList[current.value - 1] = value
}

/**
 * 提交
 */
const doSubmit = async () => {
  if (!props.appId || !answerList) {
    return
  }
  const res = await addUserAnswerService({
    appId: props.appId as any,
    choices: answerList
  } as UserAnswerAddRequest)
  if (res.status === 200 && res.data) {
    router.push(`/answer/result/${res.data}`)
  } else {
    message.error('提交答案失败，' + res.data)
  }
}
</script>

<template>
  <div id="doAnswerPage">
    <a-card>
      <h1>{{ app.appName }}</h1>
      <p>{{ app.appDesc }}</p>
      <h2 style="margin-bottom: 16px">{{ current }}、{{ currentQuestion?.title }}</h2>
      <div>
        <a-radio-group
          direction="vertical"
          v-model="currentAnswer"
          :options="questionOptions"
          @change="doRadioChange"
        />
      </div>
      <div style="margin-top: 24px">
        <a-space size="large">
          <a-button
            type="primary"
            circle
            v-if="current < questionContent.length"
            :disabled="!currentAnswer"
            @click="current += 1"
          >
            下一题
          </a-button>
          <a-button
            type="primary"
            v-if="current === questionContent.length"
            circle
            :disabled="!currentAnswer"
            @click="doSubmit"
          >
            查看结果
          </a-button>
          <a-button v-if="current > 1" circle @click="current -= 1"> 上一题 </a-button>
        </a-space>
      </div>
    </a-card>
  </div>
</template>

<style scoped></style>
