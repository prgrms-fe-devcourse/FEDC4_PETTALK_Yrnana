import styled from '@emotion/styled'
import { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

import AppBar from '@/components/common/appBar'
import NavigationBar from '@/components/common/navigationBar'
import Spacing from '@/components/common/spacing'

interface AppBarTemplateProps {
  children: ReactNode
  hasNav: boolean
  backurl?: string
  title?: string
  hasSpacing?: boolean
  hasPadding?: boolean
}

const AppBarNavTemplate = ({
  children,
  hasNav,
  title,
  hasSpacing = true,
  backurl,
  hasPadding = true,
}: AppBarTemplateProps) => {
  const location = useLocation()
  return (
    <AppBarNavTemplateWrapper>
      <AppBar mainPage={location.pathname === '/' ? true : false} title={title} backurl={backurl} />
      {hasSpacing && <Spacing size={30} />}
      <ChildrenWrapper hasPadding={hasPadding} hasSpacing={hasSpacing}>
        {children}
      </ChildrenWrapper>
      {hasNav && <NavigationBar />}
    </AppBarNavTemplateWrapper>
  )
}
export default AppBarNavTemplate

const AppBarNavTemplateWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-image: url('/src/assets/images/Background-simple.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const ChildrenWrapper = styled.div<Pick<AppBarTemplateProps, 'hasSpacing' | 'hasPadding'>>`
  padding: ${(props) => (props.hasPadding ? '0px 10px' : '0px')};
  box-sizing: border-box;
  height: calc(var(--vh, 1vh) * 100 - ${(props) => (props.hasSpacing ? '120px' : '90px')});
`
