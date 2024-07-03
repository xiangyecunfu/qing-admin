// 类型导入
import type { MenuProps } from 'antd'
import type { AppDispatch } from '@/store'

// 组件导入
import { App, Dropdown } from 'antd'
import Avatar from './Avatar'
import LoginOut from './LoginOut'

// 静态资源
import Logo from '@/assets/images/admin.svg'
// 样式导入
import '../style/layouts.less'

function Header() {
  return (
    <div className="header-container">
      <div className="header-logo">
        <img src={Logo} alt="logo" />
        <span>后台管理系统</span>
      </div>
      <div className="header-setting">
        <div className="header-avatar">
          <Avatar />
        </div>
        <LoginOut />
      </div>
    </div>
  )
}

export default Header
