import styled from '@emotion/styled'
import { Dispatch, SetStateAction } from 'react'

import { palette } from '@/styles/palette'
interface ModalProps {
  setModalState: Dispatch<SetStateAction<boolean>>
  modalState: boolean
  value: string
  width?: number
  height?: number
}

const Modal = ({ setModalState, modalState, value, width = 500, height = 400 }: ModalProps) => {
  const onClickCloseButton = () => {
    setModalState(!modalState)
  }
  return (
    <StyleModalContainer>
      <DialogBox>
        {value}
        <button onClick={onClickCloseButton}>{'끄기'}</button>
      </DialogBox>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault()
        }}
      />
    </StyleModalContainer>
  )
}

const StyleModalContainer = styled.div`
  background-color: rgba(${palette.BLACK}, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const DialogBox = styled.dialog`
  width: 600px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: ${palette.WHITE};
  z-index: 10000;
`

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`

export default Modal
