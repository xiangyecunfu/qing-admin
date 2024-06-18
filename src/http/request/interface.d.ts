// axios类型定义
import type {
  AxiosResponse,
  InternalAxiosRequestConfig,
  CreateAxiosDefaults,
  Cancel,
} from 'axios'

/**
 * 请求取消定义
 */
export interface RequestCancel extends Cancel {
  data: object
  response: {
    status: number
    data: {
      code?: number
      message?: string
    }
  }
}

/**
 * 请求拦截器
 */
export interface RequestInterceptors<T> {
  // 请求拦截器
  requestInterceptors?: (
    config: InternalAxiosRequestConfig,
  ) => InternalAxiosRequestConfig
  requestInterceptorsCatch?: (error: RequestCancel) => void

  // 响应拦截器
  responseInterceptors?: (config: T) => T
  responseInterceptorsCatch?: (error: RequestCancel) => void
}

/**
 * 自定义传参
 */
export interface CreateRequestConfig<T = AxiosResponse>
  extends CreateAxiosDefaults {
  interceptors?: RequestInterceptors<T>
}

/**
 * 接口相应数据
 */
export interface ResponseResult<T = unknown> {
  code: number
  message?: string
  data: T
}
