import { useRoutes } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { PageFiles } from './interface'
import handleRoutes from '@/utils/routeConfirm'

// 导入组件
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'
import Layout from '@/layouts'
// 处理子路由
const pages = import.meta.glob('../pages/**/*.tsx') as PageFiles
const layouts = handleRoutes(pages)

const routers: RouteObject[] = [
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: '',
    element: <Layout />,
    children: layouts,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]

function App() {
  return <>{useRoutes(routers)}</>
}

export default App
