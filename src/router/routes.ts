import Home from '@/views/Home.vue'
import UserInfo from '@/views/UserInfo.vue'
import UserLogin from '@/views/UserLogin.vue'
import UserRegisterView from '@/views/UserRegisterView.vue'
import ACCESS_ENUM from '@/access/accessEnum'
import UserManageView from '@/views/Admin/UserManageView.vue'

export const routes = [
  {
    path: '/',
    name: '主页',
    component: Home
  },
  {
    path: '/user/userInfo',
    name: '个人信息',
    component: UserInfo
  },
  {
    path: '/user/login',
    name: '用户登录',
    component: UserLogin,
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/user/register',
    name: '用户注册',
    component: UserRegisterView,
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/admin/users',
    name: '用户管理',
    component: UserManageView,
    meta: {
      access: ACCESS_ENUM.ADMIN
    }
  }
]
