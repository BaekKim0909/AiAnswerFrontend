import { defineStore } from 'pinia'
import { ref } from 'vue'
import ACCESS_ENUM from '@/access/accessEnum'
import { getLoginUserService } from '@/api/user'
import { Message } from '@arco-design/web-vue'
export interface userVO {
  userAccount?: string
  userName?: string
  userAvatar?: string
  userProfile?: string
  //user:普通用户 admin:管理员 ban:被封禁;
  userRole: string
}
export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const userInfo = ref<userVO>({
      userRole: ACCESS_ENUM.NOT_LOGIN
    })
    const setToken = (t: any) => {
      token.value = t
    }
    const setUserInfo = (newUser: userVO) => {
      userInfo.value = newUser
    }
    const fetchUserInfo = async () => {
      const response = await getLoginUserService()
      if (response.status === 200) {
        userInfo.value = response.data
        return
      }
      Message.error(response.data || '用户登录错误')
    }
    return { token, setToken, userInfo, setUserInfo, fetchUserInfo }
  },
  {
    persist: true
  }
)
