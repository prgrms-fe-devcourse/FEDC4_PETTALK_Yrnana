import styled from '@emotion/styled'

import Bell from '@/assets/icons/Bell'
import { theme } from '@/styles/theme'

import ProfileImage from '../profileImage'
import Toggle from '../toggle'

interface MainPage {
  mainPage: boolean
}

const AppBar = ({ mainPage = true }: MainPage) => {
  return (
    <HeadingBar>
      {mainPage ? (
        <Logo>{'Pet Talk'}</Logo>
      ) : (
        <HeaderContainer>
          <Icon />
          <Header>{'게시글 보기'}</Header>
        </HeaderContainer>
      )}
      <Functions>
        <Toggle />
        <Bell />
        <ProfileImage size={40} />
      </Functions>
    </HeadingBar>
  )
}

const HeadingBar = styled.div`
  width: 100%;
  height: 90px;
  padding: 10px 15px 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.palette.BACKGROUND};
`

const Logo = styled.h1`
  font-size: 25px;
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Icon = styled.div`
  width: 24px;
  height: 24px;
`

const Header = styled.h1`
  font-size: 18px;
`

const Functions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default AppBar
