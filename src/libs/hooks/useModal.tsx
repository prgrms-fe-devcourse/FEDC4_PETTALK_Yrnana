import 'react-toastify/dist/ReactToastify.css'

import { useState } from 'react'

import Modal from '@/components/common/modal'

export const useModal = () => {
  const [isModalOpen, setModalState] = useState(false)
  const openModal = () => {
    setModalState(!isModalOpen)
    setTimeout(() => {
      setModalState(false)
    }, 5000)
  }
  return { isModalOpen, openModal, Modal }
}

export default useModal
