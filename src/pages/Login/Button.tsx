import { Button } from 'antd'
import type { ButtonProps } from 'antd/es/button'

import './loginButton.less'

function LoginButton(props: ButtonProps) {
  return (
    <div className="qing-btn">
      <Button {...props} />
    </div>
  )
}

export default LoginButton
