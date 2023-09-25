import styled from '@emotion/styled'
import { ComponentProps, useEffect, useState } from 'react'

import pic1 from '@/assets/images/pet/picture1.webp'
import pic2 from '@/assets/images/pet/picture2.webp'
import pic3 from '@/assets/images/pet/picture3.webp'
import pic4 from '@/assets/images/pet/picture4.webp'
import Carousel from '@/components/channel/carousel'
import Skeleton from '@/components/channel/skeleton'
import { Channel } from '@/libs/apis/channel/channelType'

interface ChannelSliderProps extends ComponentProps<'div'> {
  data: Channel[]
}

const ChannelSlider = ({ data: channelListData }: ChannelSliderProps) => {
  const [imagesLoaded, setImagesLoaded] = useState(false)

  // 이미지 프리로딩
  useEffect(() => {
    const imagesToPreload = [pic1, pic2, pic3, pic4]
    const preloadImages = () => {
      const imagePromises: Promise<void>[] = imagesToPreload.map((src) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image()
          img.src = src
          img.onload = () => resolve()
          img.onerror = reject
        })
      })

      Promise.all(imagePromises)
        .then(() => {
          setImagesLoaded(true)
        })
        .catch((error) => {
          console.error('Error preloading images:', error)
        })
    }

    preloadImages()
  }, [])

  return (
    <CarouselWrapper>
      {imagesLoaded ? (
        <Carousel images={[pic1, pic2, pic3, pic4]} data={channelListData} />
      ) : (
        <Skeleton></Skeleton>
      )}
    </CarouselWrapper>
  )
}

const CarouselWrapper = styled.div`
  width: 100%;
  height: 190px;
  overflow: hidden;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.palette.WHITE};
`

export default ChannelSlider
