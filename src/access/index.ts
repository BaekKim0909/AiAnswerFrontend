import router from '@/router'
import { useUserStore } from '@/stores/user'
import ACCESS_ENUM from '@/access/accessEnum'
import checkAccess from '@/access/checkAccess'
import { Message } from '@arco-design/web-vue'
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const loginUser = userStore.userInfo
  //登录页面需要的权限
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN
  //需要登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    //如果未登录则跳转到登录页面
    if (!loginUser || !loginUser.userRole || loginUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
      next(`/user/login?redirect=${to.fullPath}`)
      Message.error('请先登录')
      return
    }
    //如果登录的但是没有权限则跳转到没有权限界面
    if (!checkAccess(loginUser, needAccess)) {
      next('/noAuth')
      Message.error('无权限')
      return
    }
  }
  next()
})
