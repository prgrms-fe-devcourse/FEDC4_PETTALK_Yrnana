import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import BackArrow from '@/assets/icons/BackArrow'
import Bell from '@/assets/icons/Bell'
import ProfileImage from '@/components/common/profileImage'
import { Text } from '@/components/common/text'
import Toggle from '@/components/common/toggle'
import { axiosAPI } from '@/libs/apis/axios'
import { userAtom } from '@/libs/store/userAtom'
import { palette } from '@/styles/palette'
import { theme } from '@/styles/theme'

interface MainPage {
  mainPage: boolean
  title?: string
}

const AppBar = ({ mainPage = false, title = '게시글 보기' }: MainPage) => {
  const userData = useAtom(userAtom)[0]
  const [notifyList, setNotifyList] = useState([])
  const navigate = useNavigate()
  const [isSeen, setIsSeen] = useState(true)
  const getNotification = async () => {
    return await axiosAPI.get('/notifications')
  }
  const { data, refetch } = useQuery(['notificationList'], getNotification)
  const [notifyLength, setNotifyLength] = useState<number>(data?.data.length)
  useEffect(() => {
    if (data !== undefined) setNotifyList(data.data)

    const polling = setInterval(() => {
      refetch()
      if (data?.data.length !== notifyLength) setIsSeen(false)
    }, 3000) // 페이지에 벗어날 경우 polling X
    return () => {
      clearInterval(polling)
    }
  })
  const handleSeenPost = async () => {
    await axiosAPI
      .put('/notifications/seen')
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
    setIsSeen(true)
    navigate('/notification')
  }

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
        {isSeen ? (
          <Bell style={{ cursor: 'pointer' }} onClick={handleSeenPost} />
        ) : (
          <>
            <StyleNotSeenBell />
            <Bell style={{ cursor: 'pointer' }} onClick={handleSeenPost} />
          </>
        )}

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
const StyleNotSeenBell = styled.span`
  z-index: 1;
  position: absolute;
  top: 37px;
  right: 79px;
  background-color: ${palette.RED};
  width: 9px;
  height: 9px;
  border-radius: 50px;
`

export default AppBar
