import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToken } from '@/hooks/userToken'

import type { AppDispatch } from '@/stores';

function Layout() {
  const [getToken] = useToken()
  const token = getToken()
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token])

  return (
    <>
      <h1>布局页面</h1>
    </>
  )
}

export default Layout
