// 用于处理路由信息
import { Skeleton } from 'antd';
import loadable from '@loadable/component';
import type { RouteObject } from 'react-router-dom';
import type { DefaultComponent } from "@loadable/component";
// 排除项
const ROUTER_EXCLUDE = ['Login', 'components', 'NotFound' ]


/**
 * 处理路由信息
 * @param routes 
 * @returns layouts 
 */
function handleRoutes<T> (routes: T): RouteObject[] {
  const layouts: RouteObject[] = []
  for (const route in routes) {
    // 是否属于排除项
    console.log(route, '路由情况')
    const isExclude = handleRouteExclude(route);
    if (isExclude) continue;
    
  }

  return layouts;
}

/**
 * 是否为排除路由项
 * @param route 
 */
function handleRouteExclude (path: string): boolean {
  for (let i = 0; i < ROUTER_EXCLUDE.length; i++) {
    // 排除项转为文件路径
    let excluded = `/${ROUTER_EXCLUDE[i]}/`;
    if (path.includes(excluded))  return true
  }
  return false
}

export default handleRoutes;