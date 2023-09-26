import styled from '@emotion/styled'
import { ComponentProps, forwardRef } from 'react'

import InputValueDelete from '@/assets/icons/InputValueDelete'
import { palette } from '@/styles/palette'
import { typo } from '@/styles/typo'

interface InputProps extends ComponentProps<'input'> {
  width?: number
  height?: number
  placeholder: string
  type?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { width, height = 39, type = 'text', placeholder, ...props }: InputProps,
  inputRef,
) {
  const resetInput = () => {
    if (inputRef && typeof inputRef !== 'function') {
      inputRef.current && (inputRef.current.value = '')
    }
  }

  return (
    <StyleInputWrapper>
      <StyleInput
        widthProps={width}
        heightProps={height}
        ref={inputRef}
        placeholder={placeholder}
        type={type}
        {...props}
      />
      <StyleResetIcon onClick={resetInput}>
        <InputValueDelete></InputValueDelete>
      </StyleResetIcon>
    </StyleInputWrapper>
  )
})

const StyleInputWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`
const StyleInput = styled.input<{ widthProps?: number; heightProps?: number }>`
  background-color: ${palette.GRAY100};
  height: ${({ heightProps }) => (heightProps ? `${heightProps}px` : '39px')};
  border: 1px solid ${palette.GRAY300};
  border-radius: 24px;
  width: ${({ widthProps }) => (widthProps ? `${widthProps}px` : '100%')};
  font-size: ${typo.Body_13};
  box-shadow: 3px 3px 1px ${palette.GRAY200};
  padding-left: 10px;
  padding-right: 10px;
  color: ${palette.GRAY500};
`
const StyleResetIcon = styled.button`
  position: relative;
  top: 2px;
  right: 25px;
`

export default Input
