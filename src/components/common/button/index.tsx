import { palette } from '@/styles/palette'
import { typo } from '@/styles/typo'
import styled from '@emotion/styled'
interface ButtonProps {
  buttonType: 'ExtraLarge' | 'Large' | 'Medium' | 'Small'
  value: string
  onClick: () => void
}

const index = ({ buttonType, value, onClick }: ButtonProps) => {
  return (
    <StyleButtonWrapper>
      <StyleButton buttonType={buttonType} onClick={onClick}>
        {value}
      </StyleButton>
    </StyleButtonWrapper>
  )
}

const StyleButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyleButton = styled.button<{
  buttonType: 'ExtraLarge' | 'Large' | 'Medium' | 'Small'
}>`
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
  color: ${palette.BLACK};
  font-size: ${({ buttonType }) => {
    if (buttonType == 'ExtraLarge') return `${typo.SubHead_18}`
    else if (buttonType == 'Large') return `${typo.SubHead_14}`
    else if (buttonType == 'Medium') return `${typo.Body_12}`
    else return `${typo.Body_10}`
  }};
`

export default index
