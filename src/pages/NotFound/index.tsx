import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()
  return (
    <div>
      <h1>404</h1>
      <p>Page not found</p>
      <Button type="primary" onClick={() => navigate(-1)}>
        Go back
      </Button>
    </div>
  )
}

export default NotFound
