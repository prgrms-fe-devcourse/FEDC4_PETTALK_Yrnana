import 'react-toastify/dist/ReactToastify.css'

import styled from '@emotion/styled'
import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'

import { palette } from '@/styles/palette'
import { theme } from '@/styles/theme'

interface ModalProps {
  modalText: string
  time: number
}
const Modal = ({ modalText, time }: ModalProps) => {
  const notify = () => toast(modalText)
  useEffect(() => {
    notify()
  }, [])
  return (
    <>
      <StyleModal
        position={'top-center'} // 알람 위치 지정
        autoClose={time} // 자동 off 시간
        hideProgressBar={true} // 진행시간바 숨김
        closeOnClick // 클릭으로 알람 닫기
        pauseOnHover={false}
        limit={1} // 알람 개수 제한
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
