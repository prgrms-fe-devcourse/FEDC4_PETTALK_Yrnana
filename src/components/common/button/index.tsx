import styled from '@emotion/styled'
import { ComponentProps } from 'react'

import { Text } from '@/components/common/text'
import { KeyOfPalette, KeyOfTypo, theme } from '@/styles/theme'

type ButtonType = 'ExtraLarge' | 'Large' | 'Medium' | 'Small'

interface ButtonProps extends ComponentProps<'button'> {
  buttonType: ButtonType
  value: string
  backgroundColor?: KeyOfPalette
}

type ButtonVariantType = {
  [key in 'ExtraLarge' | 'Large' | 'Medium' | 'Small']: {
    radius: number
    typo: KeyOfTypo
    width: number
    height: number
    backgroundColor: string
    color: string
  }
}

const Button = ({
  buttonType,
  value,
  onClick,
  backgroundColor = 'BEIGE',
  ...props
}: ButtonProps) => {
  return (
    <StyleButtonWrapper>
      <StyleButton
        buttonType={buttonType}
        onClick={onClick}
        backgroundColor={backgroundColor}
        {...props}
      >
        <Text typo={`${BUTTON_SHAPE_TYPE[buttonType].typo}`}>{value}</Text>
      </StyleButton>
    </StyleButtonWrapper>
  )
}

const BUTTON_SHAPE_TYPE: ButtonVariantType = {
  ExtraLarge: {
    radius: 24,
    typo: 'SubHead_18',
    width: 250,
    height: 50,
    backgroundColor: `${theme.palette.WHITE}`,
    color: `${theme.palette.BLACK}`,
  },
  Large: {
    radius: 24,
    typo: 'SubHead_14',
    width: 200,
    height: 37,
    backgroundColor: `${theme.palette.BEIGE}`,
    color: `${theme.palette.BLACK}`,
  },
  Medium: {
    radius: 15,
    typo: 'Body_12',
    width: 64,
    height: 28,
    backgroundColor: `${theme.palette.SUBBLUE}`,
    color: `${theme.palette.BLACK}`,
  },
  Small: {
    radius: 15,
    typo: 'Body_10',
    width: 39,
    height: 20,
    backgroundColor: `${theme.palette.SUBBLUE}`,
    color: `${theme.palette.BLACK}`,
  },
}
const StyleButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
const StyleButton = styled.button<{
  buttonType: ButtonType
  backgroundColor: KeyOfPalette
}>`
  width: ${({ buttonType }) => `${BUTTON_SHAPE_TYPE[buttonType].width}px`};
  height: ${({ buttonType }) => `${BUTTON_SHAPE_TYPE[buttonType].height}px`};
  border-radius: ${({ buttonType }) => `${BUTTON_SHAPE_TYPE[buttonType].radius}px`};
  ${({ buttonType }) => BUTTON_SHAPE_TYPE[buttonType].color};
  background-color: ${({ buttonType, backgroundColor }) =>
    backgroundColor
      ? `${theme.palette[backgroundColor]}`
      : BUTTON_SHAPE_TYPE[buttonType].backgroundColor};
`

export default Button
