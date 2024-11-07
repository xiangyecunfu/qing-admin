import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
interface UserModel {
  id: number
  username: string
  email: string
  phone: string
  photo?: string
}
type PermissionModel = string[]

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    permissions: [] as PermissionModel, // 用户权限
    userInfo: {
      id: 0,
      username: '',
      email: '',
      phone: '',
      photo: '',
    } as UserModel, // 用户信息
  },
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserModel>) => {
      state.userInfo = action.payload
    },
    setPermissions: (state, action: PayloadAction<PermissionModel>) => {
      state.permissions = action.payload
    },
    clearUserInfo: (state) => {
      state.userInfo = {
        id: 0,
        username: '',
        email: '',
        phone: '',
        photo: '',
      }
    },
  },
})

export const { setUserInfo, setPermissions, clearUserInfo } = userSlice.actions

export default userSlice.reducer
