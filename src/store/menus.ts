import type { SideMenu } from '@/types/interface'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    isPhone: false,
    isCollapsed: false,
    selectedKeys: 'dashboard', // 菜单选择值
    openKeys: ['Dashboard'], // 菜单展开项
    menuList: [] as SideMenu[], // 菜单列表
  },
  reducers: {
    toggleCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isCollapsed = !!action.payload
    },
    togglePhone: (state, action: PayloadAction<boolean>) => {
      state.isPhone = !!action.payload
    },
    setSelectedKeys: (state, action: PayloadAction<string>) => {
      state.selectedKeys = action.payload
    },
    setOpenKeys: (state, action: PayloadAction<string[]>) => {
      state.openKeys = action.payload
    },
    setMenuList: (state, action: PayloadAction<SideMenu[]>) => {
      state.menuList = action.payload
    },
  },
})

export const {
  toggleCollapsed,
  togglePhone,
  setSelectedKeys,
  setOpenKeys,
  setMenuList,
} = menuSlice.actions

export default menuSlice.reducer
