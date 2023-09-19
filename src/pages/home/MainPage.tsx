import styled from '@emotion/styled'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { ComponentProps } from 'react'

import ChannelList from '@/components/channel/channelList'
import ChannelSlider from '@/components/channel/channelSlider'
import InterestHeader from '@/components/channel/interestHeader'
import Spacing from '@/components/common/spacing'
import { Text } from '@/components/common/text'
import { ChannelApi } from '@/libs/apis/channel/ChannelApi'
import { Channel } from '@/libs/apis/channel/channelType'
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
  const { data, isLoading } = useQuery(['channels'], () => ChannelApi.GET_CHANNEL(), {
    onSuccess: (data) => {
      const newFilteredData = data.filter((item) => {
        if (!localStorage.getItem('isLogin')) return true
        else return !item.authRequired
      })
      setFilteredData(newFilteredData)
    },
  })

  const [filteredData, setFilteredData] = useState<Channel[]>([])

  useEffect(() => {
    if (data) {
      const newFilteredData = data.filter((item) => {
        if (!localStorage.getItem('isLogin')) return true
        else return !item.authRequired
      })
      setFilteredData(newFilteredData)
    }
  }, [data])

  if (isLoading) return <h2>{'로딩 중...'}</h2>

  return (
    <MainPageWrapper {...props}>
      <TodayChannel>
        <Text typo={todayChannelTypo} color={todayChannelColor}>
          {'오늘의 채널'}
        </Text>
        <Spacing size={15}></Spacing>
        {filteredData.length > 0 && <ChannelSlider data={filteredData} />}
      </TodayChannel>
      <InterestChannel>
        <InterestHeader typo={interestChannelTypo} color={interestChannelColor} />
        <Spacing size={30}></Spacing>
        <ChannelList data={filteredData} />
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
