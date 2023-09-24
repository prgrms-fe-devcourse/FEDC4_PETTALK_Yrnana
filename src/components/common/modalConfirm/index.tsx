import styled from '@emotion/styled'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'

import Button from '@/components/common/button'
import {
  modalConfirmAtom,
  modalConfirmFuncAtom,
  modalConfirmTextAtom,
} from '@/libs/store/modalConfirmAtom'
import { palette } from '@/styles/palette'

const ModalConfirm = () => {
  const setModalState = useSetAtom(modalConfirmAtom)
  const modalState = useAtomValue(modalConfirmAtom)
  const [okFunc, setOkFunc] = useAtom(modalConfirmFuncAtom)
  const confirmText = useAtomValue(modalConfirmTextAtom)

  const closeModal = () => {
    setModalState(false)
  }
  const OkAndClose = () => {
    okFunc.fn()
    closeModal()
  }
  return (
    <>
      {' '}
      {modalState ? (
        <StyleConfirmWrapper>
          <StyleConfirm>
            <StyleConfirmText>{confirmText}</StyleConfirmText>
            <StyleButtonWrapper>
              <Button
                buttonType={'Large'}
                value={'확인'}
                style={{ margin: 10, width: 100, height: 40 }}
                onClick={OkAndClose}
              />
              <Button
                buttonType={'Large'}
                value={'취소'}
                backgroundColor={'BACKGROUND'}
                style={{ margin: 10, width: 100, height: 40 }}
                onClick={closeModal}
              />
            </StyleButtonWrapper>
          </StyleConfirm>
        </StyleConfirmWrapper>
      ) : (
        ''
      )}
    </>
  )
}
const StyleConfirmWrapper = styled.div`
  z-index: 1;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`
const StyleConfirm = styled.div`
  width: 80%;
  height: 150px;
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  box-shadow: 3px 3px 3px ${palette.GRAY400};
`

const StyleButtonWrapper = styled.span`
  justify-content: center;
  margin: 30px;
  display: flex;
`
const StyleConfirmText = styled.h6`
  color: ${palette.GRAY700};
  text-align: center;
  margin-top: 30px;
`

export default ModalConfirm
