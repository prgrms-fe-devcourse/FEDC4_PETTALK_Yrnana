import 'react-toastify/dist/ReactToastify.css'

import styled from '@emotion/styled'
import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'

import { palette } from '@/styles/palette'
import { theme } from '@/styles/theme'

type ToastType = 'info' | 'success' | 'warning' | 'error'
interface ModalProps {
  modalText: string
  time?: number
  type?: ToastType
}
const Modal = ({ modalText, time = 3000, type = 'info' }: ModalProps) => {
  const notify = () => toast(modalText, { type })
  useEffect(() => {
    notify()
  }, [])
  return (
    <>
      <StyleModal
        position={'top-center'}
        autoClose={time}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover={false}
        limit={1}
      />
    </>
  )
}
const StyleModal = styled(ToastContainer)`
  .Toastify__toast {
    font-size: ${theme.typo.Body_13};
    border-radius: 10px;
    padding: 16px 20px;
    color: ${palette.GRAY600};
  }
`
export default Modal
