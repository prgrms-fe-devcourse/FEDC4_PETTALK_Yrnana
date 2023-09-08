import styled from '@emotion/styled'
import { useCallback, useState } from 'react'

const Input = styled.input`
  width: 0;
  height: 0;
  visibility: hidden;
  &:checked + label {
    background: #242424;
    &:after {
      left: 50px;
      transform: translateX(-100%);
      background: linear-gradient(180deg, #777, #3a3a3a);
    }
    svg {
      &.sun {
        fill: #7e7e7e;
      }
      &.moon {
        fill: #fff;
      }
    }
    + .background {
      background: #242424;
    }
  }
  &:active:after {
    width: 260px;
  }
`

const Label = styled.label`
  width: 55px;
  height: 25px;
  position: relative;
  display: block;
  background: #ebebeb;
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
    top: 5px;
    left: 5px;
    background: linear-gradient(180deg, #ffcc89, #d8860b);
    border-radius: 180px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }
  svg {
    position: absolute;
    width: 120px;
    top: 40px;
    z-index: 100;
    &.sun {
      left: 40px;
      fill: #fff;
      transition: 0.3s;
    }
    &.moon {
      left: 340px;
      fill: #7e7e7e;
      transition: 0.3s;
    }
  }
`

const Toggle = () => {
  const [state, setState] = useState(true)
  const onChange = useCallback(() => setState((toggleState) => !toggleState), [])
  return (
    <div>
      <Input type="checkbox" checked={state} onChange={onChange} />
      <Label htmlFor="darkmode-toggle"></Label>
    </div>
  )
}

export default Toggle
