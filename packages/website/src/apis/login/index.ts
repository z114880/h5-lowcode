import { request } from '@/utils/request'
import { API } from './typings'
//登录
export const loginApi = (params: API.loginParams): Promise<API.loginResponse> =>
  request({
    url: `/login`,
    method: 'get',
    params
  })

export const loadUserMessApi = (): Promise<API.loadUserMessResponse> =>
  request({
    url: `/loadUserMess`,
    method: 'get'
  })
