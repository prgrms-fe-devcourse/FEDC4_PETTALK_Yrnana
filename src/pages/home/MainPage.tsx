import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { ComponentProps } from 'react'

import Spacing from '@/components/common/spacing'
import { Text } from '@/components/common/text'
import { ChannelApi } from '@/libs/apis/channel/ChannelApi'
import ChannelList from '@/pages/home/channelList/index.tsx'
import TodayChannelSlider from '@/pages/home/channelSlider'
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
  const { data, isLoading } = useQuery(['channels'], () => ChannelApi.GET_CHANNEL())

  //TODO: 로딩 컴포넌트 추가 시 리팩토링 가능성 있음
  if (isLoading) return <h2>{'Loading중...'}</h2>
  return (
    <MainPageWrapper {...props}>
      <TodayChannel>
        <Text typo={todayChannelTypo} color={todayChannelColor}>
          {'오늘의 채널'}
        </Text>
        <Spacing size={15}></Spacing>
        <TodayChannelSlider />
      </TodayChannel>
      <Spacing size={40}></Spacing>
      <InterestChannel>
        <InterestHeader typo={interestChannelTypo} color={interestChannelColor} />
        <Spacing size={30}></Spacing>
        <ChannelList />
      </InterestChannel>
    </MainPageWrapper>
  )
}

const MainPageWrapper = styled.div``
const TodayChannel = styled.div``
const InterestChannel = styled.div``

export default MainPage
