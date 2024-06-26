import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { getProxyConfig } from './build/utils'
import { createProxy } from './build/vite/proxy'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_PROXY, VITE_PORT } = getProxyConfig(env)

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "@/styles/global.less";`,
          javascriptEnabled: true,
          charset: false,
        },
      },
    },
    server: {
      open: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
    },
    build: {},
  }
})
