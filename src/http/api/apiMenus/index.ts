import type { FormData } from '@/types/form'
import type {
  PageResponseResult,
  PaginationData,
  SideMenu,
  PermissionResponseResult,
} from '@/types/interface'
import { request } from '@/http/request'

enum API {
  URL = '/authority/menu',
}

/**
 * 获取分页数据
 * @param params - 请求参数
 * @returns Promise
 */
export function getMenuPage(params: Partial<FormData> & PaginationData) {
  return request.get<PageResponseResult<FormData[]>>(`${API.URL}/page`, {
    params,
  })
}

/**
 * 根据ID获取数据详情
 * @param id - ID
 */
export function getDetailById(id: string) {
  return request.get<FormData>(`${API.URL}/detail?id=${id}`)
}

/**
 * 新增数据
 * @param data - 请求数据
 */
export function createMenu(data: FormData) {
  return request.post(API.URL, data)
}

/**
 * 修改数据
 * @param id - 修改id值
 * @param data - 请求数据
 */
export function updateMenu(id: string, data: FormData) {
  return request.put(`${API.URL}/${id}`, data)
}

/**
 * 删除
 * @param id - 删除id值
 */
export function deleteMenu(id: string) {
  return request.delete(`${API.URL}/${id}`)
}

/**
 * 获取权限数据
 * @param data
 * @returns
 */
export function getPermission(params: object) {
  return request.get<PermissionResponseResult>(`${API.URL}/tree`, { params })
}

/**
 * 保存权限列表
 * @param data - 权限数据
 */
export function savePermission(params: object) {
  return request.put(`${API.URL}/authorize/save`, params)
}

/**
 * 获取当前菜单数据
 * @param data - 请求数据
 */
export function getMenuList() {
  return request.get<SideMenu[]>(`/menu/list/v2`)
}
