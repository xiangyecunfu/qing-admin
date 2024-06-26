import { request } from '@/http/request'
import type { LoginData, LoginResult } from '@/pages/Login/interface'

const apiUser = {
  login: (params: LoginData) => request.post<LoginResult>('/login/v2', params),
  updatePassword: (params: object) => request.post('update-password', params),
  getPermissions: (params: object) =>
    request.get<LoginResult>('/authority/user/refresh-permissions/v2', {
      params,
    }),
}

export default apiUser
