import styled from '@emotion/styled'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAtom, useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'

import BackArrow from '@/assets/icons/BackArrow'
import Bell from '@/assets/icons/Bell'
import { FlexBox } from '@/components/common/flexBox'
import ProfileImage from '@/components/common/profileImage'
import { Text } from '@/components/common/text'
import Toggle from '@/components/common/toggle'
import { axiosAPI } from '@/libs/apis/axios'
import { darkModeAtom } from '@/libs/store/darkModeAtom'
import { userAtom } from '@/libs/store/userAtom'
import { palette } from '@/styles/palette'
import { theme } from '@/styles/theme'

interface AppBarProps {
  mainPage: boolean
  title?: string
  backurl?: string
}

const AppBar = ({ mainPage = false, title = '게시글 보기', backurl }: AppBarProps) => {
  const navigate = useNavigate()
  const userData = useAtomValue(userAtom)
  const [isDarkMode] = useAtom(darkModeAtom)
  const [notifyList, setNotifyList] = useState([])

  const [isSeen, setIsSeen] = useState(true)
  const getNotification = async () => {
    return await axiosAPI.get('/notifications')
  }
  const { data } = useQuery(['notificationList'], getNotification, {
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
    retry: 3,
    onSuccess: (data) => {
      if (data !== undefined) setNotifyList(data.data)
      if (notifyList.length && data?.data.length !== notifyList.length) setIsSeen(false)
    },
  })
  const [notifyLength, setNotifyLength] = useState<number>(data?.data.length)

  const handleSeenPost = async () => {
    return await axiosAPI.put('/notifications/seen')
  }
  const seenMutation = useMutation(() => handleSeenPost(), {
    onSuccess: () => {
      setIsSeen(true)
      navigate('/notification')
    },
  })
  useEffect(() => {
    if (data !== undefined) setNotifyList(data.data)
  })
  return (
    <HeadingBar justify={'space-between'} fullWidth={true} darkmode={isDarkMode}>
      {mainPage ? (
        <Text typo={'LogoFont_30'} style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          {'Pet Talk'}
        </Text>
      ) : (
        <FlexBox gap={15}>
          <BackArrow
            style={{ cursor: 'pointer' }}
            onClick={() => {
              backurl ? navigate(`/${backurl}`) : navigate(-1)
            }}
          />
          <Text typo={'SubHead_18'} color={isDarkMode ? 'WHITE' : 'BLACK'}>
            {title}
          </Text>
        </FlexBox>
      )}
      <FlexBox gap={15}>
        <Toggle />
        {isSeen ? (
          <Bell
            style={{ cursor: 'pointer' }}
            onClick={() => seenMutation.mutate()}
            stroke={isDarkMode ? 'white' : 'black'}
          />
        ) : (
          <>
            <StyleNotSeenBell />
            <Bell
              style={{ cursor: 'pointer' }}
              onClick={() => seenMutation.mutate()}
              stroke={isDarkMode ? 'white' : 'black'}
            />
          </>
        )}

        <ProfileImage
          image={userData.image}
          size={40}
          updatable={false}
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/myprofile')}
        />
      </FlexBox>
    </HeadingBar>
  )
}

const HeadingBar = styled(FlexBox)<{ darkmode: boolean }>`
  height: 90px;
  padding: 10px 20px 0 20px;
  background-color: ${(props) =>
    props.darkmode ? `${theme.palette.GRAY700}` : `${theme.palette.BACKGROUND}`};
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.4);
  position: relative;
  z-index: 100;
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
