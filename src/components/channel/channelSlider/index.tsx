import styled from '@emotion/styled'
import { ComponentProps } from 'react'

import Carousel from '@/components/channel/carousel'
import { Channel } from '@/libs/apis/channel/channelType'

interface ChannelSliderProps extends ComponentProps<'div'> {
  data: Channel[]
}

const ChannelSlider = ({ data: channelListData }: ChannelSliderProps) => {
  const carouselItems = [
    'https://picsum.photos/480/190/?random',
    'https://picsum.photos/400/190/?random',
    'https://picsum.photos/350/190/?random',
    'https://picsum.photos/380/190/?random',
  ]

  return (
    <CarouselWrapper>
      <Carousel images={carouselItems} data={channelListData} />
    </CarouselWrapper>
  )
}

const CarouselWrapper = styled.div`
  width: 100%;
  height: 190px;
  overflow: hidden;
  border-radius: 10px;
`

export default ChannelSlider
