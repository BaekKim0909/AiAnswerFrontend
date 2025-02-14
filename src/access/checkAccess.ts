import ACCESS_ENUM from '@/access/accessEnum'
import type { userVO } from '@/stores/user'

const checkAccess = (loginUser: userVO, needAccess: string = ACCESS_ENUM.NOT_LOGIN) => {
  //获取当前用户的
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true
  }
  if (needAccess === ACCESS_ENUM.USER) {
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false
    }
  }
  if (needAccess === ACCESS_ENUM.ADMIN) {
    if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
      return false
    }
  }
  return true
}

export default checkAccess
