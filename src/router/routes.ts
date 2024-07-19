import Home from '@/views/Home.vue'
import UserInfo from '@/views/UserInfo.vue'
import UserLogin from '@/views/UserLogin.vue'
import UserRegisterView from '@/views/UserRegisterView.vue'
import ACCESS_ENUM from '@/access/accessEnum'
import UserManageView from '@/views/Admin/UserManageView.vue'
import AppDetailView from '@/views/App/AppDetailView.vue'
import AddAppPage from '@/views/App/AddAppPage.vue'
import AddQuestionPage from '@/views/Question/AddQuestionPage.vue'
import AddScoringResultPage from '@/views/Question/AddScoringResultPage.vue'
import DoAnswerPage from '@/views/Question/DoAnswerPage.vue'
import AnswerResultPage from '@/views/Question/AnswerResultPage.vue'

export const routes = [
  {
    path: '/',
    name: '主页',
    component: Home
  },
  {
    path: '/add/app',
    name: '创建应用',
    component: AddAppPage
  },
  {
    path: '/add/app/:id',
    name: '修改应用',
    props: true,
    component: AddAppPage,
    meta: {
      hideInMenu: true
    }
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
  },
  {
    //动态路由
    path: '/app/detail/:id',
    name: 'App详情',
    component: AppDetailView,
    props: true,
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/add/question/:appId',
    name: '创建题目',
    component: AddQuestionPage,
    props: true,
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/add/scoring_result/:appId',
    name: '创建评分',
    component: AddScoringResultPage,
    props: true,
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/answer/do/:appId',
    name: '答题',
    component: DoAnswerPage,
    props: true,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.USER
    }
  },
  {
    path: '/answer/result/:id',
    name: '答题结果',
    component: AnswerResultPage,
    props: true,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.USER
    }
  }
]
