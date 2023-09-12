import styled from '@emotion/styled'
import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import AppBar from '@/components/common/appBar'
import NavigationBar from '@/components/common/navigationBar'
import Spacing from '@/components/common/spacing'
interface AppBarTemplateProps {
  children: ReactNode
  hasNav: boolean
  title?: string
}
const AppBarNavTemplate = ({ children, hasNav, title }: AppBarTemplateProps) => {
  const location = useLocation()
  return (
    <AppBarNavTemplateWrapper>
      <AppBar mainPage={location.pathname === '/' ? true : false} title={title} />
      <Spacing size={30} />
      <ChildrenWrapper>{children}</ChildrenWrapper>
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

const ChildrenWrapper = styled.div`
  padding: 0px 10px;
  box-sizing: border-box;
`
