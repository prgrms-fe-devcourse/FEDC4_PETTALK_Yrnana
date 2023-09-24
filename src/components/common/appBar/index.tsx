import styled from '@emotion/styled'
import { useAtomValue } from 'jotai'
import { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'

import BackArrow from '@/assets/icons/BackArrow'
import Bell from '@/assets/icons/Bell'
import Loading from '@/components/common/loading'
import ProfileImage from '@/components/common/profileImage'
import { Text } from '@/components/common/text'
import Toggle from '@/components/common/toggle'
import { userAtom } from '@/libs/store/userAtom'
import { theme } from '@/styles/theme'

interface AppBarProps {
  mainPage: boolean
  title?: string
  backurl?: string
}

const AppBar = ({ mainPage = false, title = '게시글 보기', backurl }: AppBarProps) => {
  const navigate = useNavigate()
  const userData = useAtomValue(userAtom)

  return (
    <HeadingBar>
      {mainPage ? (
        <Text typo={'LogoFont_30'} style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          {'Pet Talk'}
        </Text>
      ) : (
        <HeaderContainer>
          <BackArrow
            style={{ cursor: 'pointer' }}
            onClick={() => {
              backurl ? navigate(`/${backurl}`) : navigate(-1)
            }}
          />
          <Text typo={'SubHead_18'}>{title}</Text>
        </HeaderContainer>
      )}
      <Functions>
        <Toggle />
        <Bell style={{ cursor: 'pointer' }} onClick={() => navigate('/notification')} />
        <ProfileImage
          image={userData.image}
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
  position: relative;
  z-index: 100;
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
