import { createSlice } from '@reduxjs/toolkit'
interface UserInfo {
  id: number
  username: string
  email: string
  phone: string
  photo?: string
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    permissions: [], // 用户权限
    userInfo: {
      id: 0,
      username: '',
      email: '',
      phone: '',
      photo: '',
    } as UserInfo, // 用户信息
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    setPermissions: (state, action) => {
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
