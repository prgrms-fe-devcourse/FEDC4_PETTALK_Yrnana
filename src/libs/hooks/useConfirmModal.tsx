import { useSetAtom } from 'jotai'

import ModalConfirm from '@/components/common/modalConfirm'
import { modalConfirmAtom } from '@/libs/store/modalConfirmAtom'
export const useConfirmModal = () => {
  const setModalState = useSetAtom(modalConfirmAtom)
  const openConfirmModal = () => {
    setModalState(true)
  }

  return { openConfirmModal, ModalConfirm }
}
