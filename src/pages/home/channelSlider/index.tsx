import styled from '@emotion/styled'

import { Channel } from '@/libs/apis/channel/channelType'
import Carousel from '@/pages/home/carousel'

type ChannelSliderProps = {
  data: Channel[]
}

const ChannelSlider = ({ data }: ChannelSliderProps) => {
  const carouselItems = [
    'https://picsum.photos/480/190/?random',
    'https://picsum.photos/400/190/?random',
    'https://picsum.photos/350/190/?random',
    'https://picsum.photos/380/190/?random',
  ]

  return (
    <CarouselWrapper>
      <Carousel images={carouselItems} />
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
