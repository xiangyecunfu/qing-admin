import axios from 'axios'
import { message } from '@/utils/useStatic'
import AxiosRequest from '@/http/request/config'
import Cookies from 'js-cookie'

// token定义
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY as string

// 生成环境所用的接口
const prefixUrl = import.meta.env.VITE_BASE_URL as string
const baseURL = process.env.NODE_ENV !== 'development' ? prefixUrl : '/api'

function createRequest(url: string): AxiosRequest {
  return new AxiosRequest({
    baseURL: url,
    timeout: 5000, // 请求超时时间5秒
    // 拦截器
    interceptors: {
      // 请求拦截
      requestInterceptors(res) {
        const token = Cookies.get(TOKEN_KEY) || ''
        if (res?.headers && token) {
          res.headers.Authorization = `Bearer ${token}`
        }
        return res
      },
      // 请求超时拦截
      requestInterceptorsCatch(error) {
        message.error('请求超时，请稍后再试!')
        return error
      },
      // 响应拦截
      responseInterceptors(res) {
        const { data } = res
        // 权限不足拦截
        if (data?.code === 401) {
          message.error('权限不足，请重新登录!')
          Cookies.remove(TOKEN_KEY)
          setTimeout(() => {
            window.location.href = '/'
          }, 1000)
          handleError(data?.message)
          return res
        }
        // 错误处理
        if (data?.code !== 200) {
          handleError(data?.message)
          return res
        }
        return res
      },
      // 响应超时拦截
      responseInterceptorsCatch(error) {
        // 取消重复请求则不报错
        if (axios.isCancel(error)) {
          error.data = error.data || {}
          return error
        }
        handleError('服务器错误，请稍后再试!')
        return error
      },
    },
  })
}

/**
 * 异常处理
 * @param error - 错误信息
 * @param content - 自定义内容
 */
const handleError = (error: string, content?: string) => {
  console.error('错误信息:', error)
  message.error({
    content: content || error || '服务器错误',
    key: 'error',
  })
}

// 创建请求
export const request = createRequest(baseURL)

// 取消请求
export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url)
}

// 取消全部请求
export const cancelAllRequest = () => {
  return request.cancelAllRequest()
}
