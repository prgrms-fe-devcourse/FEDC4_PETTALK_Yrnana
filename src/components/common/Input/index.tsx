import styled from '@emotion/styled'
import { forwardRef, MutableRefObject, ComponentPropsWithRef } from 'react'
import { palette } from '@/styles/palette'
import { typo } from '@/styles/typo'

type InputProps = ComponentPropsWithRef<'input'> & {
  width: string
  placeholder: string
  inputRef: MutableRefObject<HTMLInputElement | null>
}

const Input = forwardRef(({ width, placeholder, inputRef }: InputProps) => {
  const resetInput = () => {
    if (inputRef.current) inputRef.current.value = ''
  }
  return (
    <>
      <StyleInputWrapper>
        <StyleInput widthProps={width} ref={inputRef} placeholder={placeholder} width={width} />
        {/* 이 버튼 자리에 x표시 아이콘 넣을 예정 */}
        <StyleResetIcon onClick={resetInput}>x</StyleResetIcon>
      </StyleInputWrapper>
    </>
  )
})

const StyleInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyleInput = styled.input<{ widthProps: string }>`
  background-color: ${palette.GRAY100};
  height: 39px;
  border: 1px solid ${palette.GRAY300};
  border-radius: 24px;
  width: ${(widthProps) => widthProps.width};
  font-size: ${typo.Body_13};
  box-shadow: 3px 3px 1px ${palette.GRAY200};
  padding-left: 10px;
  padding-right: 10px;
  color: ${palette.GRAY500};
`
const StyleResetIcon = styled.button`
  position: relative;
  right: 20px;
`

export default Input
