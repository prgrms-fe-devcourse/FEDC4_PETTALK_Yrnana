import styled from '@emotion/styled'

import BackArrow from '@/assets/icons/BackArrow'
import Bell from '@/assets/icons/Bell'
import ProfileImage from '@/components/common/profileImage'
import { Text } from '@/components/common/Text'
import Toggle from '@/components/common/toggle'
import { theme } from '@/styles/theme'

interface MainPage {
  mainPage: boolean
  title: string
}

const AppBar = ({ mainPage = false, title = '게시글 보기' }: MainPage) => {
  return (
    <HeadingBar>
      {mainPage ? (
        <Text typo={'LogoFont_30'}>{'Pet Talk'}</Text>
      ) : (
        <HeaderContainer>
          <BackArrow />
          <Text typo={'SubHead_18'}>{title}</Text>
        </HeaderContainer>
      )}
      <Functions>
        <Toggle />
        <Bell />
        <ProfileImage size={40} updatable={false} />
      </Functions>
    </HeadingBar>
  )
}

const HeadingBar = styled.div`
  width: 100%;
  height: 90px;
  padding: 10px 20px 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.palette.BACKGROUND};
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.4);
`

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Functions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default AppBar
