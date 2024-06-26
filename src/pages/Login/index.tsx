import { Form, Input, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import LoginButton from './Button'
import { LoginData } from './interface'
import { SideMenu } from '@/types/interface'
import { setUserInfo, setPermissions } from '@/store/user'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { setMenuList } from '@/store/menus'
import { getPermissionMenus } from '@/utils/menu'

import { useToken } from '@/hooks/userToken'
import { useCommonStore } from '@/hooks/useCommonStore'

import type { FormProps } from 'antd'

import './index.less'
import './index.module.less'
// 导入请求
import apiUser from '@/http/api/apiUser'
import { getMenuList } from '@/http/api/apiMenus'

function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const dispatch = useDispatch<AppDispatch>()
  const [getToken, setToken] = useToken()
  const { permissions, menuList } = useCommonStore()
  const { login, getPermissions } = apiUser

  // 获取用户权限
  const getUserPermissions = async () => {
    setLoading(true)
    const { code, data } = await getPermissions({ refresh_cache: false })
    setLoading(false)
    if (Number(code) !== 200) return
    const { user, permissions } = data
    dispatch(setUserInfo(user))
    dispatch(setPermissions(permissions))
    handleGoMenu(permissions)
  }
  useEffect(() => {
    if (getToken()) {
      if (!permissions?.length) {
        getUserPermissions()
      } else {
        // 有权限则直接跳转
        handleGoMenu(permissions)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 获取菜单数据
  const getMenuData = async () => {
    if (menuList?.length) return menuList
    let res: SideMenu[] = []
    setLoading(true)
    const { code, data } = await getMenuList()
    setLoading(false)
    if (Number(code) !== 200) return
    dispatch(setMenuList(data))
    res = data
    return res
  }

  // 跳转菜单
  const handleGoMenu = async (permissions: string[]) => {
    let menus: SideMenu[] = menuList
    if (!menus?.length) {
      menus = (await getMenuData()) as SideMenu[]
    }
    // 判断是否有权限菜单
    const isPermissionMenu = getPermissionMenus(menus, permissions)
    if (!isPermissionMenu) {
      return messageApi.error({
        content: '当前没有权限，请联系管理员！',
        key: 'permissions',
      })
    }
    navigate(isPermissionMenu)
  }

  // 登录
  const handleFinish: FormProps['onFinish'] = async (values: LoginData) => {
    try {
      setLoading(true)
      const { code, data } = await login(values)
      if (Number(code) !== 200) return
      const { token, user, permissions } = data
      if (!token || !permissions?.length) {
        messageApi.error({
          content: '当前没有权限，请联系管理员！',
          key: 'permissions',
        })
      }
      setToken(token)
      dispatch(setUserInfo(user))
      dispatch(setPermissions(permissions))
      handleGoMenu(permissions)
    } finally {
      setLoading(false)
    }
  }
  const handleFinishFailed: FormProps['onFinishFailed'] = (errors) => {
    console.error('error:', errors)
  }
  return (
    <>
      {contextHolder}
      <div className="login-wrapper">
        <Form
          className="login-form"
          name="horizontal_login"
          initialValues={{
            username: 'admin',
            password: 'admin123456',
          }}
          onFinish={handleFinish}
          onFinishFailed={handleFinishFailed}
        >
          <Form.Item>
            <div className="login-form-title">
              <img
                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                alt=""
              />
              <span>后台管理系统</span>
            </div>
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              allow-clear="true"
              placeholder="请输入用户名"
              className="login-form-input"
              addonBefore={
                <UserOutlined className="login-form-icon"></UserOutlined>
              }
            />
          </Form.Item>
          <Form.Item
            name="password"
            className="login-form-input"
            rules={[
              { required: true, message: '请输入密码' },
              {
                pattern:
                  /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*+._\-*]{6,30}$/,
                message: '密码长度大于6位，且必须包含字母、数字或符号',
              },
            ]}
          >
            <Input.Password
              allowClear
              placeholder="请输入密码"
              addonBefore={
                <LockOutlined className="login-form-icon"></LockOutlined>
              }
            />
          </Form.Item>
          <Form.Item className="login-form-button">
            <LoginButton loading={loading} htmlType="submit" type="primary">
              登录
            </LoginButton>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}

export default Login
