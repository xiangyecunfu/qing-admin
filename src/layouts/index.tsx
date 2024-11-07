import { useEffect, useState } from 'react'
import { useNavigate, useOutlet } from 'react-router-dom'
import { useToken } from '@/hooks/userToken'
import { Skeleton, message } from 'antd'
import KeepAlive from 'react-activation'
import { Icon } from '@iconify/react'

// 组件
import Menu from '@/layouts/components/Menu'
import Header from '@/layouts/components/Header'
import Tabs from '@/layouts/components/Tabs'
import Forbidden from '@/pages/ForbiddenPage'

import type { AppDispatch } from '@/stores'

// 样式导入
import style from './style/layouts.module.less'

function Layout() {
  const [getToken] = useToken()
  const token = getToken()
  const navigate = useNavigate()
  const outlet = useOutlet()
  const [isLoading, setIsLoading] = useState(true)
  const [isRefresh, setIsRefresh] = useState(false)
  const [permissions, setPermissions] = useState<string[]>([])
  const [uri, setUri] = useState('')
  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token])

  return (
    <div id={style.layout}>
      {contextHolder}
      <div id={style.layoutHeader}>
        <Header />
      </div>
      <div id={style.layoutContent}>
        <Menu />
        <div id={style.layoutContentMain}>
          <Tabs />
          <div className="main-container">
            {/* 骨架 */}
            {isLoading && permissions.length === 0 && (
              <Skeleton active className="p-30px" paragraph={{ rows: 10 }} />
            )}
            {/* 403 */}
            {!isLoading && permissions.length === 0 && <Forbidden />}
            {/* 重载 */}
            {isRefresh && (
              <div
                className={`
                  absolute
                  left-50%
                  top-50%
                  -rotate-x-50%
                  -rotate-y-50%
                `}
              >
                <Icon
                  className="text-40px animate-spin"
                  icon="ri:loader-2-fill"
                />
              </div>
            )}
            {/* 主要内容区域 */}
            {permissions.length > 0 && !isRefresh && (
              <KeepAlive id={uri} name={uri}>
                {outlet}
              </KeepAlive>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
