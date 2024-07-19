import type { UserVO } from '@/Model/User'

export type UserAnswerAddRequest = {
  appId?: string
  choices?: string[]
}

export type UserAnswerVO = {
  appId?: number
  appType?: number
  choices?: string[]
  createTime?: string
  id?: number
  resultDesc?: string
  resultId?: number
  resultName?: string
  resultPicture?: string
  resultScore?: number
  scoreStrategy?: number
  updateTime?: string
  user?: UserVO
  userId?: number
}
