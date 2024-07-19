import request from '@/utils/request'
import type { AppAddRequest, AppEditRequest, AppQueryRequest } from '@/Model/App'

export const listAppVoByPageService = (appQuery: AppQueryRequest) => {
  return request.post('/api/app/list/page/vo', { ...appQuery })
}
export const getAppVoByIdService = (id: string) => {
  return request.get(`/api/app/getAppVo/${id}`)
}
export const addAppService = (app: AppAddRequest) => {
  return request.post('/api/app/add', { ...app })
}
export const updateAppService = (app: AppEditRequest) => {
  return request.post('/api/app/update', { ...app })
}
