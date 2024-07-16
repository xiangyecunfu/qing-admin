import type { NewModalProps } from './index'
import { Modal } from 'antd'
import errorImg from '@/assets/images/public/error.png'
import successImg from '@/assets/images/public/success.png'
import warningImg from '@/assets/images/public/warning.png'
import './baseModal.less'

interface StateModel {
  success?: string
  error?: string
  warning?: string
}

function BaseModal(props: NewModalProps) {
  const stateSrc: StateModel = {
    success: successImg,
    error: errorImg,
    warning: warningImg,
  }
  const imgSrc = stateSrc[props.state as keyof StateModel]
  return (
    <Modal
      title={props.title}
      open={props.open}
      onOk={props.onOk}
      onCancel={props.onCancel}
      afterClose={props.afterClose}
      cancelText={props.cancelText}
      okText={props.okText}
      okType={props.okType}
      width={600}
    >
      <div className="modal-content">
        <img src={imgSrc} />
        <p>{props.content ? props.content : '操作成功！'}</p>
      </div>
    </Modal>
  )
}

export default BaseModal
