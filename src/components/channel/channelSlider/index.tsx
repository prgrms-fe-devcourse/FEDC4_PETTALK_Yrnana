import styled from '@emotion/styled'
import { ComponentProps } from 'react'

import pic1 from '@/assets/images/pet/pickture1.jpg'
import pic2 from '@/assets/images/pet/pickture2.jpg'
import pic3 from '@/assets/images/pet/pickture3.jpg'
import pic4 from '@/assets/images/pet/pickture4.jpg'
import Carousel from '@/components/channel/carousel'
import { Channel } from '@/libs/apis/channel/channelType'

interface ChannelSliderProps extends ComponentProps<'div'> {
  data: Channel[]
}

const ChannelSlider = ({ data: channelListData }: ChannelSliderProps) => {
  const carouselItems = [pic1, pic2, pic3, pic4]

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
