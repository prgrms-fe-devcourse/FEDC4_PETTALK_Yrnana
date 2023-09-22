import styled from '@emotion/styled'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { ComponentProps } from 'react'
import { useNavigate } from 'react-router-dom'

import ChannelList from '@/components/channel/channelList'
import ChannelSlider from '@/components/channel/channelSlider'
import InterestHeader from '@/components/channel/interestHeader'
import Skeleton from '@/components/channel/skeleton'
import Loading from '@/components/common/loading'
import Spacing from '@/components/common/spacing'
import { Text } from '@/components/common/text'
import { ChannelApi } from '@/libs/apis/channel/ChannelApi'
import { Channel } from '@/libs/apis/channel/channelType'
import { queryClient } from '@/libs/apis/queryClient'
import { KeyOfPalette, KeyOfTypo } from '@/styles/theme'

interface MainPageProps extends ComponentProps<'div'> {
  todayChannelTypo?: KeyOfTypo
  todayChannelColor?: KeyOfPalette
  interestChannelTypo?: KeyOfTypo
  interestChannelColor?: KeyOfPalette
}

const MainPage = ({
  todayChannelTypo = 'Headline_23',
  todayChannelColor = 'BLACK',
  interestChannelTypo = 'Headline_20',
  interestChannelColor = 'BLACK',
  ...props
}: MainPageProps) => {
  const { data, isLoading, refetch } = useQuery(['channels'], () => ChannelApi.GET_CHANNEL(), {
    cacheTime: 0,
  })

  useEffect(() => {
    refetch()
  }, [refetch])

  const filterData = (data: Channel[]) => {
    return data.filter((item) => {
      if (localStorage.getItem('isLogin')) return true
      else return !item.authRequired
    })
  }

  if (isLoading) return <Loading />

  return (
    <MainPageWrapper {...props}>
      <TodayChannel>
        <Text typo={todayChannelTypo} color={todayChannelColor}>
          {'오늘의 채널'}
        </Text>
        <Spacing size={15}></Spacing>
        {!isLoading && <ChannelSlider data={filterData(data as Channel[])} />}
      </TodayChannel>
      <InterestChannel>
        <InterestHeader typo={interestChannelTypo} color={interestChannelColor} />
        <Spacing size={30}></Spacing>
        {!isLoading && <ChannelList data={filterData(data as Channel[])} />}
      </InterestChannel>
    </MainPageWrapper>
  )
}

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex: 1;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 25%;
`

const TodayChannel = styled.div``

const InterestChannel = styled.div``

export default MainPage
