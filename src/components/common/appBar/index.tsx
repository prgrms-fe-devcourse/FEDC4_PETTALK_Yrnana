import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

import BackArrow from '@/assets/icons/BackArrow'
import Bell from '@/assets/icons/Bell'
import ProfileImage from '@/components/common/profileImage'
import { Text } from '@/components/common/text'
import Toggle from '@/components/common/toggle'
import { theme } from '@/styles/theme'

interface MainPage {
  mainPage: boolean
  title?: string
}

const AppBar = ({ mainPage = false, title = '게시글 보기' }: MainPage) => {
  const navigate = useNavigate()

  return (
    <HeadingBar>
      {mainPage ? (
        <Text typo={'LogoFont_30'} style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          {'Pet Talk'}
        </Text>
      ) : (
        <HeaderContainer>
          <BackArrow style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
          <Text typo={'SubHead_18'}>{title}</Text>
        </HeaderContainer>
      )}
      <Functions>
        <Toggle />
        <Bell style={{ cursor: 'pointer' }} onClick={() => navigate('/notification')} />
        <ProfileImage
          image={'https://picsum.photos/200/300'}
          size={40}
          updatable={false}
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/myprofile')}
        />
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
  gap: 15px;
`

const Functions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
`

export default AppBar
