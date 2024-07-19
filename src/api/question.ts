import type { QuestionAddRequest, QuestionEditRequest } from '@/Model/Question'
import request from '@/utils/request'

export const addQuestionService = (question: QuestionAddRequest) => {
  return request.post('/api/question/add', { ...question })
}
export const editQuestionService = (question: QuestionEditRequest) => {
  return request.post('/api/question/edit', { ...question })
}
export const getQuestionVoService = (appId: string) => {
  return request.get(`/api/question/get/vo/${appId}`)
}
