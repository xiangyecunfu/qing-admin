import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import menusReducer from './menus'
import tabsReducer from './tabs'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    user: userReducer,
    menus: menusReducer,
    tabs: tabsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
