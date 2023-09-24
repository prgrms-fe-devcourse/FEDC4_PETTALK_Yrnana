import 'react-toastify/dist/ReactToastify.css'

import { toast } from 'react-toastify'

import Modal from '@/components/common/modal'

type ToastType = 'info' | 'success' | 'warning' | 'error'
export const useModal = () => {
  const openModal = ({
    type = 'info',
    content,
    ...props
  }: {
    type?: ToastType
    content: string
  }) => {
    toast(content, {
      type: type,
      ...props,
    })
  }
  return { openModal, Modal }
}

export default useModal
