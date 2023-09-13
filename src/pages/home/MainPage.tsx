import styled from '@emotion/styled'
import { ComponentProps } from 'react'

import Footprint from '@/assets/icons/Footprint.tsx'
import CubeButton from '@/components/common/cubeButton'
import { FlexBox } from '@/components/common/flexBox'
import Spacing from '@/components/common/spacing'
import { Text } from '@/components/common/text'
import Carousel from '@/pages/home/carousel'
import { KeyOfPalette, KeyOfTypo } from '@/styles/theme'

import { channelMock } from '../../mock/channel.ts'

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
  const carouselItems = [
    'https://picsum.photos/390/190/?random',
    'https://picsum.photos/390/190/?random',
    'https://picsum.photos/390/190/?random',
    'https://picsum.photos/390/190/?random',
  ]
  return (
    <>
      <TodayChannel>
        <Text typo={TodayChannelTypo} color={TodayChannelColor}>
          {'오늘의 채널'}
        </Text>
        <Spacing size={15}></Spacing>
        <TodayChannelSlider>
          <Carousel images={carouselItems} />
        </TodayChannelSlider>
      </TodayChannel>
      <Spacing size={40}></Spacing>
      <InterestingChannel>
        <FlexBox justify={'flex-start'} gap={10}>
          <StyledHeader typo={InterestingChannelTypo} color={InterestingChannelColor}>
            {'관심사에 맞는 채널을 탐색해보세요.'}
          </StyledHeader>
          <IconWrapper>
            <FirstIcon>
              <Footprint />
            </FirstIcon>
            <SecondIcon>
              <Footprint />
            </SecondIcon>
          </IconWrapper>
        </FlexBox>
        <Spacing size={30}></Spacing>
        <ChannelWrapper>
          {channelMock &&
            channelMock.map((channel, index) => {
              if (index % 2 === 0) {
                const nextChannel = channelMock[index + 1]

                return (
                  <div key={channel._id}>
                    <FlexBox gap={13}>
                      <CubeButton content={channel.name} path={`/${channel._id}`}></CubeButton>
                      {nextChannel && (
                        <CubeButton
                          content={nextChannel.name}
                          path={`/${nextChannel._id}`}
                        ></CubeButton>
                      )}
                    </FlexBox>
                    <Spacing size={13}></Spacing>
                  </div>
                )
              }

              return null
            })}
        </ChannelWrapper>
      </InterestingChannel>
    </>
  )
}

const TodayChannel = styled.div``
const InterestingChannel = styled.div``
const TodayChannelSlider = styled.div`
  width: 100%; /* 너비를 100%로 설정하여 부모 요소에 맞게 확장됩니다. */
  height: 190px;
  background-color: aliceblue;
  overflow: hidden;
`
const ChannelWrapper = styled.div``

const StyledHeader = styled(Text)`
  width: 55%;
  line-height: 1.3;
  word-break: keep-all;
`

const IconWrapper = styled.div`
  position: relative;
`
const FirstIcon = styled.div`
  position: absolute;
  bottom: 2px;
`

const SecondIcon = styled.div`
  position: absolute;
  left: 20px;
  top: 2px;
`

export default MainPage
