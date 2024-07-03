import { Button } from 'antd'

function ForbiddenPage() {
  return (
    <div>
      <h1>403</h1>
      <p>Forbidden</p>
      <Button type="primary" href="/">
        返回首页
      </Button>
    </div>
  )
}

export default ForbiddenPage
