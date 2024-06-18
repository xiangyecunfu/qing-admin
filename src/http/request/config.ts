import axios from 'axios'
import type {
  AxiosResponse,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
} from 'axios'
import type {
  RequestInterceptors,
  CreateRequestConfig,
  ResponseResult,
} from './interface'

// 定义axios请求
class AxiosRequest {
  // axios实例
  private instance: AxiosInstance
  // 拦截器
  private interceptorsObj?: RequestInterceptors<AxiosResponse>
  // 存放取消请求控制器Map
  private abortControllerMap: Map<string, AbortController>

  constructor(config: CreateRequestConfig) {
    this.instance = axios.create(config)
    this.abortControllerMap = new Map()
    this.interceptorsObj = config.interceptors
    // 拦截器执行顺序 接口请求 -> 实例请求 -> 全局请求 -> 实例响应 -> 全局响应 -> 接口响应
    this.instance.interceptors.request.use(
      (res: InternalAxiosRequestConfig) => {
        const controller = new AbortController()
        let url = res.method || ''
        res.signal = controller.signal

        if (res.url) url += `^${res.url}`

        // 请求参数存在
        if (res.params) {
          for (const key in res.params) {
            url += `&${key}=${res.params[key]}`
          }
        }
        // 如果存在post数据
        if (
          res.data &&
          res.data?.[0] === '{' &&
          res.data?.[res.data?.length - 1] === '}'
        ) {
          const obj = JSON.parse(res.data)
          for (const key in obj) {
            url += `#${key}=${obj[key]}`
          }
        }
        // 是否存在重复请求
        if (this.abortControllerMap.has(url)) {
          console.warn('取消重复请求：', url)
          this.cancelRequest(url)
        } else {
          this.abortControllerMap.set(url, controller)
        }
        return res
      },
      (error: object) => error,
    )

    // 使用拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch,
    )
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch,
    )
    // 全局响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        const url = res.config.url || ''
        this.abortControllerMap.delete(url) // 成功后删除请求
        return res.data
      },
      (error: object) => error,
    )
  }
  // 取消重复请求
  cancelRequest(url: string | string[]) {
    const urlList = Array.isArray(url) ? url : [url]
    for (const _url in urlList) {
      this.abortControllerMap.get(_url)?.abort()
      this.abortControllerMap.delete(_url)
    }
  }
  // 全部取消请求
  cancelAllRequest() {
    for (const [, controller] of this.abortControllerMap) {
      controller.abort()
    }
    this.abortControllerMap.clear()
  }

  /**
   * get请求
   * @param url -url地址
   * @param options -参数
   * @returns
   */
  get<T = object>(url: string, options = {}): Promise<ResponseResult<T>> {
    return this.instance.get(url, options)
  }

  /**
   * post请求
   * @param url -url地址
   * @param options -参数
   * @param config -配置项
   * @returns
   */
  post<T = object>(
    url: string,
    options = {},
    config?: AxiosRequestConfig<object>,
  ): Promise<ResponseResult<T>> {
    return this.instance.post(url, options, config)
  }

  /**
   * put请求
   * @param url -url地址
   * @param options -参数
   * @param config -配置项
   * @returns
   */
  put<T = object>(
    url: string,
    options = {},
    config?: AxiosRequestConfig<object>,
  ): Promise<ResponseResult<T>> {
    return this.instance.put(url, options, config)
  }

  /**
   * delete请求
   * @param url -url地址
   * @param options -参数
   * @returns
   */
  delete<T = object>(url: string, options = {}): Promise<ResponseResult<T>> {
    return this.instance.delete(url, options)
  }
}

export default AxiosRequest
