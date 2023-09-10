import styled from '@emotion/styled'
import { theme } from '@/styles/theme'
import moon from '@/assets/Group 28.svg'
// import { useCallback, useState } from 'react'

const Toggle = () => {
  // const [state, setState] = useState(true)
  // const onChange = useCallback(() => setState((toggleState) => !toggleState), [])
  return (
    <div>
      <Input type="checkbox" checked={false} />
      <Label>
        <Moon src={moon} />
      </Label>
    </div>
  )
}

const Input = styled.input`
  width: 0;
  height: 0;
  visibility: hidden;
  &:checked + label {
    background: ${theme.palette.GRAY700};
    &:after {
      left: 47px;
      transform: translateX(-100%);
      background: linear-gradient(180deg, #777, #3a3a3a);
    }
  }
  &:active:after {
    width: 260px;
  }
`

const Label = styled.label`
  width: 50px;
  height: 21px;
  position: relative;
  display: block;
  background: ${theme.palette.WHITE};
  border-radius: 200px;
  box-shadow:
    inset 0px 5px 15px rgba(0, 0, 0, 0.4),
    inset 0px -5px 15px rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: 0.3s;
  &:after {
    content: '';
    width: 15px;
    height: 15px;
    position: absolute;
    top: 3px;
    left: 3px;
    background: linear-gradient(180deg, ${theme.palette.SUBYELLOW}, #ffcc89);
    border-radius: 180px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }
`

const Moon = styled.img`
  position: relative;
  top: 2px;
  right: 2px;
  transform: translateX(200%);
`

export default Toggle
