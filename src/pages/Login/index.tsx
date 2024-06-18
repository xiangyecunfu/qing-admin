import { Form, Button, Input, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './index.less'
import './index.module.less'

function Login() {
  function handleFinish() {

  }
  const handleFinishFailed = () => {

  }
  return (
    <div className='login-wrapper'>
      <Form
        className='login-form'
        name="horizontal_login"
        autoComplete="on"
        initialValues={{
          username: 'admin',
          password: 'admin123456'
        }}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
      >
        <Form.Item>
          <div className='login-form-title'>
            <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="" />
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
            className='login-form-input'
            addonBefore={<UserOutlined className='login-form-icon'></UserOutlined>}
          />
        </Form.Item>
        <Form.Item
          name="password"
          className='login-form-input'
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password
            allowClear
            placeholder="请输入密码"
            addonBefore={<LockOutlined className='login-form-icon'></LockOutlined>}
          />
        </Form.Item>
        <Form.Item className='login-form-button'>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
