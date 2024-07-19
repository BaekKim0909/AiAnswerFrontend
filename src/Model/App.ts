import type { UserVO } from '@/Model/User'

export type AppQueryRequest = {
  pageIndex?: number
  pageSize?: number
  reviewStatus?: number
}
export type AppVO = {
  appDesc?: string
  appIcon?: string
  appName?: string
  appType?: number
  createTime?: string
  id?: string
  reviewMessage?: string
  reviewStatus?: number
  reviewTime?: string
  reviewerId?: number
  scoringStrategy?: number
  updateTime?: string
  userVo?: UserVO
  userId?: number
}
export type AppAddRequest = {
  appDesc?: string
  appIcon?: string
  appName?: string
  appType?: number
  scoringStrategy?: number
}
export type AppEditRequest = {
  id?: string
  appDesc?: string
  appIcon?: string
  appName?: string
  appType?: number
  scoringStrategy?: number
}
