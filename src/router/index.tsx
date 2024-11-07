import type { AppDispatch } from '@/store'
import { BrowserRouter } from 'react-router-dom'
import { App, ConfigProvider } from 'antd'
import { AliveScope } from 'react-activation'
import { useDispatch } from 'react-redux'

import AppPage from './App'
import UseStatic from '@/utils/useStatic'

function Router() {
  const dispatch = useDispatch<AppDispatch>()
  return (
    <BrowserRouter>
      <ConfigProvider>
        <App>
          <UseStatic />
          <AliveScope>
            <AppPage />
          </AliveScope>
        </App>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default Router
