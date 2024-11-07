import { useCallback, useEffect, useState } from 'react'
import type { MenuProps } from 'antd'

import type { SideMenu } from '@/types/interface'
import { Menu } from 'antd'
import { Icon } from '@iconify/react'
import { useCommonStore } from '@/hooks/useCommonStore'
import { useAppDispatch } from '@/store'
import { setOpenKeys, setSelectedKeys } from '@/store/menus'
import { setActiveKey, setNav, addTabs } from '@/store/tabs'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  filterMenus,
  getMenuByKey,
  getOpenMenuByRouter,
  handleFilterMenus,
  splitPath,
} from '@/utils/menu'

// 样式导入
import style from '../style/layouts.module.less'

function LayoutMenu() {
  const [menus, setMenus] = useState<SideMenu[]>([])
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isCollapsed, openKeys, selectedKeys, permissions, menuList } =
    useCommonStore()

  // 处理默认展开
  useEffect(() => {
    const newOpenKey = getOpenMenuByRouter(pathname)
    if (!isCollapsed) {
      dispatch(setOpenKeys(newOpenKey))
      dispatch(setSelectedKeys(pathname))
    }
  }, [pathname])

  /**
   * 转换菜单icon格式
   * @param menus - 菜单
   */
  const filterMenuIcon = useCallback((menus: SideMenu[]) => {
    for (let i = 0; i < menus.length; i++) {
      if (menus[i]?.icon) {
        menus[i].icon = <Icon icon={menus[i].icon as string} />
      }

      if (menus[i]?.children?.length) {
        filterMenuIcon(menus[i].children as SideMenu[])
      }
    }
  }, [])

  // 过滤没权限菜单
  useEffect(() => {
    if (permissions.length > 0) {
      const newMenus = filterMenus(menuList, permissions)
      filterMenuIcon(newMenus)
      setMenus(newMenus || [])
    }
  }, [filterMenuIcon, permissions, menuList])

  /**
   * 展开/关闭回调
   * @param openKeys - 展开键值
   */
  const onOpenChange = (openKeys: string[]) => {
    const newOpenKey: string[] = []
    let last = '' // 最后一个目录结构
    // 当目录有展开值
    if (openKeys.length > 0) {
      last = openKeys[openKeys.length - 1]
      const lastArr: string[] = splitPath(last)
      newOpenKey.push(last)
      // 对比当前展开目录是否是同一层级
      for (let i = openKeys.length - 2; i >= 0; i--) {
        const arr = splitPath(openKeys[i])
        const hasOpenKey = diffOpenMenu(arr, lastArr)
        if (hasOpenKey) newOpenKey.unshift(openKeys[i])
      }
    }
    dispatch(setOpenKeys(newOpenKey))
  }

  /**
   * 对比当前展开目录是否是同一层级
   * @param arr - 当前展开目录
   * @param lastArr - 最后展开的目录
   */
  const diffOpenMenu = (arr: string[], lastArr: string[]) => {
    let result = true
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] !== lastArr[j]) {
        result = false
        break
      }
    }
    return result
  }

  /**
   * 点击菜单
   * @param e - 菜单事件
   */
  const onClick: MenuProps['onClick'] = (e) => {
    goPath(e.key)
  }

  /**
   * 处理跳转
   * @param path - 路径
   */
  const goPath = (path: string) => {
    navigate(path)
    const menuByKeyProps = { menus, permissions, key: path }
    const newTab = getMenuByKey(menuByKeyProps)
    if (newTab) {
      dispatch(setActiveKey(newTab.key))
      dispatch(setNav(newTab.nav))
      dispatch(addTabs(newTab))
    }
  }

  // 隐藏菜单
  // const hiddenMenu = () => {
  //   dispatch(toggleCollapsed(true))
  // }

  return (
    <div className={style.layoutMenu}>
      <Menu
        mode="inline"
        selectedKeys={[selectedKeys]}
        openKeys={openKeys}
        inlineCollapsed={isCollapsed}
        items={handleFilterMenus(menus)}
        onClick={onClick}
        onOpenChange={onOpenChange}
      />
    </div>
  )
}

export default LayoutMenu
