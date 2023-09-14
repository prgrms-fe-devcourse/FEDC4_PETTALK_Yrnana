import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { ComponentProps } from 'react'

import Spacing from '@/components/common/spacing'
import { Text } from '@/components/common/text'
import { ChannelApi } from '@/libs/apis/channel/ChannelApi'
import { Channel } from '@/libs/apis/channel/channelType'
import ChannelList from '@/pages/home/channelList/index.tsx'
import ChannelSlider from '@/pages/home/channelSlider'
import InterestHeader from '@/pages/home/interestHeader/index.tsx'
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
  const { data: channelListData, isLoading } = useQuery(['channels'], () =>
    ChannelApi.GET_CHANNEL(),
  )

  if (isLoading) return <h2>{'로딩 중...'}</h2>

  return (
    <MainPageWrapper {...props}>
      <TodayChannel>
        <Text typo={todayChannelTypo} color={todayChannelColor}>
          {'오늘의 채널'}
        </Text>
        <Spacing size={15}></Spacing>
        <ChannelSlider data={channelListData as Channel[]} />
      </TodayChannel>
      <InterestChannel>
        <InterestHeader typo={interestChannelTypo} color={interestChannelColor} />
        <Spacing size={30}></Spacing>
        <ChannelList data={channelListData as Channel[]} />
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
