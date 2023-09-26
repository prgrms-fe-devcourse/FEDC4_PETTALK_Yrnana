import { useSetAtom } from 'jotai'

import ModalConfirm from '@/components/common/modalConfirm'
import {
  modalConfirmAtom,
  modalConfirmFuncAtom,
  modalConfirmTextAtom,
} from '@/libs/store/modalConfirmAtom'
interface ModalConfirmPropsType {
  okFunc: () => void
  confirmText: string
}
export const useConfirmModal = () => {
  const setModalState = useSetAtom(modalConfirmAtom)
  const setModalText = useSetAtom(modalConfirmTextAtom)
  const setModalFunc = useSetAtom(modalConfirmFuncAtom)

  const openConfirmModal = ({ confirmText, okFunc }: ModalConfirmPropsType) => {
    setModalState(true)
    setModalText(confirmText)
    setModalFunc({ fn: okFunc })
  }

  return { openConfirmModal, ModalConfirm }
}
