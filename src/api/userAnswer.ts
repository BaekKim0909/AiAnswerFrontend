import type { UserAnswerAddRequest } from '@/Model/UserAnswer'
import request from '@/utils/request'

export const addUserAnswerService = (userAnswer: UserAnswerAddRequest) => {
  return request.post('/api/user_answer/add', { ...userAnswer })
}
export const getUserAnswerVoService = (id: string) => {
  return request.get(`/api/user_answer/getVo/${id}`)
}
