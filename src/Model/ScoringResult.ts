import type { UserVO } from '@/Model/User'

export type ScoringResultAddRequest = {
  appId?: number
  resultDesc?: string
  resultName?: string
  resultPicture?: string
  resultProp?: string[]
  resultScoreRange?: number
}
export type ScoringResultVO = {
  appId?: number
  createTime?: string
  id?: number
  resultDesc?: string
  resultName?: string
  resultPicture?: string
  resultProp?: string[]
  resultScoreRange?: number
  updateTime?: string
  user?: UserVO
  userId?: number
}
export type ScoringResultEditRequest = {
  id?: number
  resultDesc?: string
  resultName?: string
  resultPicture?: string
  resultProp?: string[]
  resultScoreRange?: number
}
export type ScoringResultQueryRequest = {
  appId?: number
  current?: number
  id?: number
  notId?: number
  pageSize?: number
  resultDesc?: string
  resultName?: string
  resultPicture?: string
  resultProp?: string
  resultScoreRange?: number
  searchText?: string
  sortField?: string
  sortOrder?: string
  userId?: number
}
export type ScoringResult = {
  appId?: number
  createTime?: string
  id?: string
  isDelete?: number
  resultDesc?: string
  resultName?: string
  resultPicture?: string
  resultProp?: string
  resultScoreRange?: number
  updateTime?: string
  userId?: number
}
