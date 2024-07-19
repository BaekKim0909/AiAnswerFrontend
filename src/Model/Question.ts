import type { UserVO } from '@/Model/User'

export type QuestionContentDTO = {
  options?: Option[]
  title?: string
}
export type Option = {
  key?: string
  result?: string
  score?: number
  value?: string
}
export type QuestionAddRequest = {
  appId?: number
  questionContent?: QuestionContentDTO[]
}
export type QuestionEditRequest = {
  id?: number
  questionContent?: QuestionContentDTO[]
}
export type QuestionVO = {
  appId?: number
  createTime?: string
  id?: number
  questionContent?: QuestionContentDTO[]
  updateTime?: string
  user?: UserVO
  userId?: number
}
