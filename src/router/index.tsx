import { BrowserRouter } from 'react-router-dom'
import { App, ConfigProvider } from 'antd'
import { AliveScope } from 'react-activation'

import AppPage from './App'
import UseStatic from '@/utils/useStatic'

function Router() {
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
