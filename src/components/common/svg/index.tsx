import logo from '@/assets/icons/Chat.svg'
import { ReactComponentElement } from 'react'

interface SvgProps {
  logo: string
  width?: number
  height?: number
}

const Svg = ({ logo, width, height }: SvgProps) => {
  return (
    <>
      <img src={logo} className="App-logo" alt="logo" />
    </>
  )
}

export default Svg
