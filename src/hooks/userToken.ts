import Cookies from 'js-cookie'

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY

export function useToken() {
  const getToken = () => Cookies.get(TOKEN_KEY) || ''
  const setToken = (token: string) => Cookies.set(TOKEN_KEY, token)
  const removeToken = () => Cookies.remove(TOKEN_KEY)
  return [getToken, setToken, removeToken] as const
}
