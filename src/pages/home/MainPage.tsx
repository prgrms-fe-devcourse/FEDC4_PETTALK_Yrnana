import styled from '@emotion/styled'
import { ComponentProps } from 'react'

import CubeButton from '@/components/common/cubeButton'
import { FlexBox } from '@/components/common/flexBox'
import Spacing from '@/components/common/spacing'
import { Text } from '@/components/common/text'
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
    <>
      <TodayChannel>
        <Text typo={TodayChannelTypo} color={TodayChannelColor}>
          {'오늘의 채널'}
        </Text>
        <Spacing size={15}></Spacing>
        <TodayChannelSlider></TodayChannelSlider>
      </TodayChannel>
      <Spacing size={40}></Spacing>
      <InterestingChannel>
        <Text typo={InterestingChannelTypo} color={InterestingChannelColor}>
          {'관심사에 맞는 채널을 탐색해보세요.'}
        </Text>
        <Spacing size={30}></Spacing>
        <ChannelWrapper>
          <FlexBox gap={13}>
            <CubeButton content={'안녕하세요~'} path={'/123'}></CubeButton>
            <CubeButton content={'안녕하세요~'} path={'/123'}></CubeButton>
          </FlexBox>
          <Spacing size={13}></Spacing>
          <FlexBox gap={13}>
            <CubeButton content={'안녕하세요~'} path={'/123'}></CubeButton>
            <CubeButton content={'안녕하세요~'} path={'/123'}></CubeButton>
          </FlexBox>
        </ChannelWrapper>
      </InterestingChannel>
    </>
  )
}

const TodayChannel = styled.div``
const InterestingChannel = styled.div``
const TodayChannelSlider = styled.div`
  height: 190px;
  background-color: aliceblue;
`
const ChannelWrapper = styled.div``

export default MainPage
