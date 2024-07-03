import type { MenuProps } from 'antd'

import { Dropdown } from 'antd'
import { FormOutlined, LogoutOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAliveController } from 'react-activation'

import { useCommonStore } from '@/hooks/useCommonStore'

type MenuKey = 'password' | 'logout'

function LoginOut() {
  const { username } = useCommonStore()
  const navigate = useNavigate()
  const { clear } = useAliveController()

  const items: MenuProps['items'] = [
    {
      key: 'password',
      label: <span>修改密码</span>,
      icon: <FormOutlined className="mr-10px" />,
    },
    {
      key: 'logout',
      label: <span>退出登录</span>,
      icon: <LogoutOutlined className="mr-10px" />,
    },
  ]
  // 点击菜单
  const onClick: MenuProps['onClick'] = (e) => {
    switch (e.key as MenuKey) {
      case 'password':
        console.log('修改密码')
        break
      case 'logout':
        logout()
        break
      default:
        break
    }
  }
  // 退出登录
  const logout = () => {
    console.log('退出登录')
    // clear()
    // navigate('/login')
  }

  return (
    <>
      <div className="login-out">
        <Dropdown menu={{ items, onClick }}>
          <div className="user-name">{username || 'qing-admin'}</div>
        </Dropdown>
      </div>
    </>
  )
}

export default LoginOut
