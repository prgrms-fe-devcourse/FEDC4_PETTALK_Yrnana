import styled from '@emotion/styled'
import { useAtom } from 'jotai'

import moon from '@/assets/Group 28.svg'
import Sun from '@/assets/icons/Sun'
import { darkModeAtom, toggleDarkModeAtom } from '@/libs/store/darkModeAtom'
import { theme } from '@/styles/theme'

const Toggle = () => {
  const [isDarkMode] = useAtom(darkModeAtom)
  const [, toggleDarkMode] = useAtom(toggleDarkModeAtom)

  const handleToggle = () => {
    toggleDarkMode()
    sessionStorage.setItem('darkMode', JSON.stringify(!isDarkMode))
  }

  return (
    <>
      <Input type={'checkbox'} readOnly checked={isDarkMode} />
      <Label onClick={handleToggle}>
        {isDarkMode ? <Sun width={21} height={21} /> : <Moon src={moon} />}
      </Label>
    </>
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
  user-select: none;
`

export default Toggle
