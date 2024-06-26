import { createSlice } from '@reduxjs/toolkit'
interface UserInfo {
  id: number
  username: string
  email: string
  phone: string
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
      }
    },
  },
})

export const { setUserInfo, setPermissions, clearUserInfo } = userSlice.actions

export default userSlice.reducer
