// 登录传入数据
export interface LoginData {
  username: string
  password: string
}

// 用户数据
interface UserInfo {
  id: number
  username: string
  phone: string
  email: string
  address: string
}

// 用户权限数据
interface Roles {
  id: string
}

// 登录返回数据
export interface LoginResult {
  token: string
  user: UserInfo
  permissions: string[]
  roles: Roles[]
}
