// 用于处理路由信息
import { Skeleton } from 'antd'
import loadable from '@loadable/component'
import type { RouteObject } from 'react-router-dom'
import '@/styles/router.less'
import { PageFiles } from './interface'
// import type { DefaultComponent } from '@loadable/component'
// 排除项
const ROUTER_EXCLUDE = ['Login', 'components', 'NotFound']

/**
 * 处理路由信息
 * @param routes
 * @returns layouts
 */
function handleRoutes(routes: PageFiles): RouteObject[] {
  const layouts: RouteObject[] = []
  for (const route in routes) {
    // 是否属于排除项
    const isExclude = handleRouteExclude(route)
    if (isExclude) continue
    const path = getRoutePath(route)
    const ComponentNode = loadable(routes[route], {
      fallback: (
        <Skeleton active className="route-skeleton" paragraph={{ rows: 10 }} />
      ),
    })
    layouts.push({
      path,
      element: <ComponentNode />,
    })
  }
  return layouts
}

/**
 * 是否为排除路由项
 * @param route
 */
function handleRouteExclude(path: string): boolean {
  for (let i = 0; i < ROUTER_EXCLUDE.length; i++) {
    // 排除项转为文件路径
    const excluded = `/${ROUTER_EXCLUDE[i]}/`
    if (path.includes(excluded)) return true
  }
  return false
}

/**
 * 获取路由路径
 * @param path 路由路径信息
 * @returns 路由路径
 */
function getRoutePath(path: string): string {
  const res = path.match(/\/pages\/([a-zA-Z]+)\/index.tsx/)
  if (!res) return ''
  return `/${res[1]}`
}

export default handleRoutes
