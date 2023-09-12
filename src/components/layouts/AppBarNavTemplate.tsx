import styled from '@emotion/styled'
import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import AppBar from '@/components/common/appBar'
import NavigationBar from '@/components/common/navigationBar'
interface AppBarTemplateProps {
  children: ReactNode
  hasNav: boolean
}
const AppBarNavTemplate = ({ children, hasNav }: AppBarTemplateProps) => {
  const location = useLocation()
  return (
    <AppBarNavTemplateWrapper>
      <AppBar mainPage={location.pathname === '/' ? true : false} />
      {children}
      {hasNav && <NavigationBar />}
    </AppBarNavTemplateWrapper>
  )
}
export default AppBarNavTemplate

const AppBarNavTemplateWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`
