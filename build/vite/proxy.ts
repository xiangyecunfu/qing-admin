import type { ProxyOptions } from 'vite'

type ProxyList = [string, string][]

type ProxyTargetList = Record<string, ProxyOptions>

/**
 * 创建一个跨域代理
 * @param proxyList
 */
export const createProxy = (proxyList: ProxyList = []) => {
  const result: ProxyTargetList = {}

  for (const [prefix, target] of proxyList) {
    result[`^${prefix}`] = {
      target,
      changeOrigin: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
    }
  }
  return result
}
