import { useRef, useEffect } from 'react'
import { useCommonStore } from '@/hooks/useCommonStore'
import AvatarBase from '@/assets/images/a-avatar.png'

function Avatar() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { userAVatar } = useCommonStore()

  const drawAvatar = () => {
    // 创建上下文
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    // 创建image对象
    const img = new Image()
    img.src = userAVatar || AvatarBase
    const width = canvas?.width || 80
    const height = canvas?.height || 80

    // 绘制头像
    img.onload = () => {
      ctx?.drawImage(img, 0, 0, width, height)
    }
    // 加载失败
    img.onerror = () => {
      console.log('头像加载失败')
    }
  }
  useEffect(() => {
    drawAvatar()
  }, [userAVatar])

  return (
    <>
      <canvas ref={canvasRef} width={80} height={80}></canvas>
    </>
  )
}

export default Avatar
