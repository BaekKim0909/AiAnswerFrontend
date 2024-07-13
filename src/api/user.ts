import request from '@/utils/request'
import type { AxiosResponse } from 'axios'
import type { UserQueryRequest } from '@/Model/User'
interface LoginInfo {
  userAccount: string
  userPassword: string
}
interface RegisterInfo {
  userAccount: string
  userPassword: string
  checkedPassword: string
}
export const userLoginService = ({ userAccount, userPassword }: LoginInfo) => {
  return request.post('/api/user/login', { userAccount, userPassword })
}
export const userRegisterService = ({
  userAccount,
  userPassword,
  checkedPassword
}: RegisterInfo) => {
  return request.post('/api/user/register', { userAccount, userPassword, checkedPassword })
}
export const getLoginUserService = () => {
  return request.get('/api/user/userInfo')
}
export const getUserListService = (QueryRequest: UserQueryRequest) => {
  return request.post('/api/user/users', {
    ...QueryRequest
  })
}
export const deleteUserByIdService = (id: string) => {
  return request.delete(`/api/user/${id}`)
}
