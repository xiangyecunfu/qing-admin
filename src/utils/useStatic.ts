import {
  App,
  message as antdMessage,
  notification as antdNotification,
  Modal as antdModal,
} from 'antd'
import type { MessageInstance } from 'antd/es/message/interface'
import type { NotificationInstance } from 'antd/es/notification/interface'
import type { ModalStaticFunctions } from 'antd/es/modal/confirm'

let message: MessageInstance = antdMessage
let notification: NotificationInstance = antdNotification
const { ...resetFns } = antdModal
let modal: Omit<ModalStaticFunctions, 'warn'> = resetFns

function useStatic() {
  const staticFunctions = App.useApp()
  // 重置静态方法
  message = staticFunctions.message
  notification = staticFunctions.notification
  modal = staticFunctions.modal
  return null
}

export { message, notification, modal }

export default useStatic
