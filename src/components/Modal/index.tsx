import type { ModalProps } from 'antd'
import ReactDOM from 'react-dom/client'
import { useCallback, useState } from 'react'
import BaseModal from './BaseModal'

export interface NewModalProps
  extends Omit<ModalProps, 'open' | 'onCancel' | 'onOk' | 'afterClose'> {
  title?: string
  state: string
  content: string
  cancelText?: string
  okText?: string
  open: boolean
  onOk?: () => void
  onCancel?: () => void
  afterClose?: () => void
  showCancelBtn?: boolean
  showOkBtn?: boolean
}

type configType = Omit<NewModalProps, 'open'>

function useModal() {
  const [hasDom, setHasDom] = useState(false)
  const modal = useCallback((config: configType) => {
    if (hasDom) return
    return new Promise<void>((resolve, reject) => {
      const el = document.createElement('div')
      const root = ReactDOM.createRoot(el)
      // unmount
      const close = () => {
        const result: unknown = root.unmount()
        setTimeout(() => {
          if (result && el.parentNode) {
            el.parentNode.removeChild(el)
          }
        }, 100)
      }
      // callbancl
      const clickCallback = (action: string) => {
        setHasDom(false)
        if (action === 'confirm') {
          resolve()
        } else if (action === 'cancel') {
          reject('cancel')
        } else {
          reject('close')
        }
      }
      // onOK
      const onOk = () => {
        clickCallback('confirm')
        close()
      }
      // onCancel
      const onCancel = () => {
        clickCallback('cancel')
        close()
      }
      // afterClosed
      const afterClose = () => {
        clickCallback('close')
        close()
      }
      const resetProps = {
        ...config,
        state: config.state || 'success',
        cancelText: config.cancelText || '取消',
        okText: config.okText || '确定',
        open: true,
        showCancelBtn: config.showCancelBtn || true,
        showOkBtn: config.showOkBtn || true,
        onOk,
        onCancel,
        afterClose,
      } as NewModalProps
      // render
      root.render(<BaseModal {...resetProps} />)
      setHasDom(true)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return modal
}

export default useModal
