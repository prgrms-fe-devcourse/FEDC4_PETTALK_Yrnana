import React from 'react'
import { ReactComponentElement } from 'react'
import { ReactComponent as Bell } from '@/assets/icons/Bell.svg'

interface SvgProps {
  logo: string
  width?: number
  height?: number
}

const Svg = ({ logo, width, height = 100 }: SvgProps) => {
  return (
    <>
      <img height={height} src={logo} className="App-logo" alt="logo" />
      <Bell />
    </>
  )
}

export default Svg
