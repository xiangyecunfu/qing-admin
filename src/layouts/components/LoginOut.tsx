import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'
import { FormOutlined, LogoutOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAliveController } from 'react-activation'

import { useCommonStore } from '@/hooks/useCommonStore'
import { useAppDispatch } from '@/store'
import { clearUserInfo } from '@/store/user'
import useModal from '@/components/Modal'
import style from '../style/layouts.module.less'

type MenuKey = 'password' | 'logout'

function LoginOut() {
  const { username } = useCommonStore()
  const navigate = useNavigate()
  const { clear } = useAliveController()
  const dispatch = useAppDispatch()
  const modal = useModal()

  const items: MenuProps['items'] = [
    {
      key: 'password',
      label: <span>修改密码</span>,
      icon: <FormOutlined className="mr-10" />,
    },
    {
      key: 'logout',
      label: <span>退出登录</span>,
      icon: <LogoutOutlined className="mr-10" />,
    },
  ]
  // 点击菜单
  const onClick: MenuProps['onClick'] = (e) => {
    switch (e.key as MenuKey) {
      case 'password':
        handleUpdatePassword()
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
    modal({
      title: '温馨提示',
      content: '确定要退出登录吗？',
      state: 'warning',
    }).then(() => {
      dispatch(clearUserInfo())
      clear()
      navigate('/login')
    })
  }
  // 修改密码
  const handleUpdatePassword = () => {}
  return (
    <>
      <div className={style.loginOut}>
        <Dropdown menu={{ items, onClick }}>
          <div className={style.userName}>{username || 'qing-admin'}</div>
        </Dropdown>
      </div>
    </>
  )
}

export default LoginOut
