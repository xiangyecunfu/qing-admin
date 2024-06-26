import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import menusReducer from './menus'

export const store = configureStore({
  reducer: {
    user: userReducer,
    menus: menusReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
