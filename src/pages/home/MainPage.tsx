import styled from '@emotion/styled'
import { ComponentProps } from 'react'

import Spacing from '@/components/common/spacing'
import { Text } from '@/components/common/text'
import ChannelList from '@/pages/home/channelList/index.tsx'
import TodayChannelSlider from '@/pages/home/channelSlider'
import InterestHeader from '@/pages/home/interestHeader/index.tsx'
import { KeyOfPalette, KeyOfTypo } from '@/styles/theme'

interface MainPageProps extends ComponentProps<'div'> {
  TodayChannelTypo?: KeyOfTypo
  TodayChannelColor?: KeyOfPalette
  InterestingChannelTypo?: KeyOfTypo
  InterestingChannelColor?: KeyOfPalette
}

const MainPage = ({
  TodayChannelTypo = 'Headline_23',
  TodayChannelColor = 'BLACK',
  InterestingChannelTypo = 'Headline_20',
  InterestingChannelColor = 'BLACK',
  ...props
}: MainPageProps) => {
  return (
    <MainPageWrapper {...props}>
      <TodayChannel>
        <Text typo={TodayChannelTypo} color={TodayChannelColor}>
          {'오늘의 채널'}
        </Text>
        <Spacing size={15}></Spacing>
        <TodayChannelSlider />
      </TodayChannel>
      <Spacing size={40}></Spacing>
      <InterestChannel>
        <InterestHeader typo={InterestingChannelTypo} color={InterestingChannelColor} />
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
