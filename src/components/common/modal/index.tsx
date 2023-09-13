import 'react-toastify/dist/ReactToastify.css'

import { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'

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
      <ToastContainer
        position={'top-center'} // 알람 위치 지정
        autoClose={time} // 자동 off 시간
        hideProgressBar={true} // 진행시간바 숨김
        closeOnClick // 클릭으로 알람 닫기
        theme={'light'}
        limit={1} // 알람 개수 제한
      />
    </>
  )
}

export default Modal
