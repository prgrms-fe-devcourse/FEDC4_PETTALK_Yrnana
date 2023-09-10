import { palette } from '@/styles/palette'
import { typo } from '@/styles/typo'
import styled from '@emotion/styled'
import { ComponentProps } from 'react'

interface ButtonProps extends ComponentProps<'button'> {
  buttonType: 'ExtraLarge' | 'Large' | 'Medium' | 'Small'
  value: string
  backgroundColor?: string
}

type ButtonVariantType = {
  [key in 'ExtraLarge' | 'Large' | 'Medium' | 'Small']: {
    radius: number
    typo: string
    width: number
    height: number
    backgroundColor: string
    color: string
  }
}

const Button = ({ buttonType, value, onClick, backgroundColor }: ButtonProps) => {
  return (
    <StyleButtonWrapper>
      <StyleButton buttonType={buttonType} onClick={onClick} backgroundColor={backgroundColor}>
        {value}
      </StyleButton>
    </StyleButtonWrapper>
  )
}

const BUTTON_SHAPE_TYPE: ButtonVariantType = {
  ExtraLarge: {
    radius: 24,
    typo: `${typo.SubHead_18}`,
    width: 250,
    height: 50,
    backgroundColor: palette.WHITE,
    color: palette.BLACK,
  },
  Large: {
    radius: 24,
    typo: `${typo.SubHead_14}`,
    width: 200,
    height: 37,
    backgroundColor: palette.BEIGE,
    color: palette.BLACK,
  },
  Medium: {
    radius: 15,
    typo: `${typo.Body_12}`,
    width: 64,
    height: 28,
    backgroundColor: palette.SUBBLUE,
    color: palette.BLACK,
  },
  Small: {
    radius: 15,
    typo: `${typo.Body_10}`,
    width: 39,
    height: 20,
    backgroundColor: palette.SUBBLUE,
    color: palette.BLACK,
  },
}
const StyleButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
// const StyleButton = styled.button<Pick<ButtonProps, 'buttonType' | 'backgroundColor'>>`
//   width: ${({ buttonType }) => BUTTON_SHAPE_TYPE[buttonType].width};
//   height: ${({ buttonType }) => BUTTON_SHAPE_TYPE[buttonType].height};
//   border-radius: ${({ buttonType }) => BUTTON_SHAPE_TYPE[buttonType].radius};
//   color: ${({ buttonType }) => BUTTON_SHAPE_TYPE[buttonType].color};
//   font-size: ${({ buttonType }) => BUTTON_SHAPE_TYPE[buttonType].typo};
//   background-color: ${({ buttonType }) => BUTTON_SHAPE_TYPE[buttonType].backgroundColor};
// `

const StyleButton = styled.button<Pick<ButtonProps, 'buttonType' | 'backgroundColor'>>`
  width: ${({ buttonType }) => {
    if (buttonType == 'ExtraLarge') return '250px'
    else if (buttonType == 'Large') return '200px'
    else if (buttonType == 'Medium') return '64px'
    else return '39px'
  }};
  height: ${({ buttonType }) => {
    if (buttonType == 'ExtraLarge') return '50px'
    else if (buttonType == 'Large') return '37px'
    else if (buttonType == 'Medium') return '28px'
    else return '20px'
  }};
  border-radius: 24px;
  background-color: ${({ buttonType }) => {
    if (buttonType == 'ExtraLarge') return `${palette.WHITE}`
    else if (buttonType == 'Large') return `${palette.BEIGE}`
    else if (buttonType == 'Medium') return `${palette.SUBBLUE}`
    else return `${palette.SUBBLUE}`
  }};
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${palette.BLACK};
  font-size: ${({ buttonType }) => {
    if (buttonType == 'ExtraLarge') return `${typo.SubHead_18}`
    else if (buttonType == 'Large') return `${typo.SubHead_14}`
    else if (buttonType == 'Medium') return `${typo.Body_12}`
    else return `${typo.Body_10}`
  }};
`

export default Button
