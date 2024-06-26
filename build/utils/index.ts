type EnvConfig = Record<string, string | undefined>
type ProxyApi = [string, string][]

interface ViteEnv {
  VITE_PORT: number
  VITE_PROXY: ProxyApi
}
/**
 * 获取环境变量中的代理信息
 * @param env 工程数据
 * @returns 代理信息
 */
export function getProxyConfig(env: EnvConfig): ViteEnv {
  const { VITE_PORT, VITE_PROXY } = env
  const proxy: ProxyApi = VITE_PROXY
    ? JSON.parse(VITE_PROXY.replace(/'/g, '"'))
    : []
  const result: ViteEnv = {
    VITE_PROXY: proxy,
    VITE_PORT: Number(VITE_PORT) || 8080,
  }
  return result
}

/**
 * JS模块分包
 * @param id - 标识符
 */
export function splitJSModules(id: string) {
  // pnpm兼容
  const pnpmName = id.includes('.pnpm') ? '.pnpm/' : ''
  const fileName = `node_modules/${pnpmName}`

  const result = id.split(fileName)[1].split('/')[0].toString()

  return result
}
