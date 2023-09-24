import styled from '@emotion/styled'
import { ComponentProps, forwardRef } from 'react'

import { FlexBox } from '@/components/common/flexBox'
import { palette } from '@/styles/palette'

interface TextAreaProps extends ComponentProps<'textarea'> {
  width?: number
  height?: number
  placeholder?: string
  value?: string
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function Textarea(
  { width, height, placeholder = '메세지를 입력해주세요.', value, ...props }: TextAreaProps,
  textareaRef,
) {
  return (
    <FlexBox fullWidth={true}>
      <StyledTextArea
        widthProps={width}
        heightProps={height}
        ref={textareaRef}
        placeholder={placeholder}
        value={value}
        {...props}
      />
    </FlexBox>
  )
})

const StyledTextArea = styled.textarea<{ widthProps?: number; heightProps?: number }>`
  width: ${({ widthProps }) => (widthProps ? `${widthProps}px` : '100%')};
  height: ${({ heightProps }) => (heightProps ? `${heightProps}px` : '50px')};
  background-color: ${palette.WHITE};
  color: ${palette.GRAY700};
  border-radius: 10px;
  border: none;
  resize: none;
  padding: 15px;
  padding-right: 40px;
  line-height: 130%;
  ${({ theme }) => theme.typo.Body_13};
  ::placeholder {
    ${({ theme }) => theme.typo.Caption_11}
    color: ${({ theme }) => theme.palette.GRAY500};
  }
`

export default TextArea
