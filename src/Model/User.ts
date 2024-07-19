export type UserQueryRequest = {
  id?: string
  userAccount?: string
  pageIndex?: number
  pageSize?: number
}
export type UserVO = {
  createTime?: string
  userAccount?: string
  userAvatar?: string
  userName?: string
  userProfile?: string
  userRole?: string
}
