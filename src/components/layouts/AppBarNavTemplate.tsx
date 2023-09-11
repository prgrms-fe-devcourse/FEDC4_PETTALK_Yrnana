import styled from '@emotion/styled'
import { ReactNode } from 'react'

import NavigationBar from '@/components/common/navigationBar'
interface AppBarTemplateProps {
  children: ReactNode
  hasNav: boolean
}
const AppBarNavTemplate = ({ children, hasNav }: AppBarTemplateProps) => {
  return (
    <AppBarNavTemplateWrapper>
      {/*AppBar 추가 예정*/}
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
