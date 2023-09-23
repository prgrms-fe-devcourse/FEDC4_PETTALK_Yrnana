import styled from '@emotion/styled'
import { ComponentProps, SyntheticEvent, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import picture1 from '@/assets/images/pet/picture1.webp'
import { FlexBox } from '@/components/common/flexBox'
import { Text } from '@/components/common/text'
import { Channel } from '@/libs/apis/channel/channelType'
import { palette } from '@/styles/palette'
import { KeyOfPalette, KeyOfTypo } from '@/styles/theme'

interface CarouselProps extends ComponentProps<'div'> {
  images: string[]
  data: Channel[]
  channelTypo?: KeyOfTypo
  channelColor?: KeyOfPalette
}

const Carousel = ({
  images,
  data: channelListData,
  channelTypo = 'Headline_20',
  channelColor = 'BLACK',
}: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 1500)

    return () => clearInterval(interval)
  }, [activeIndex])

  useEffect(() => {
    if (sliderRef.current) {
      const imageWidth = sliderRef.current.offsetWidth
      sliderRef.current.style.transform = `translateX(-${activeIndex * imageWidth}px)`
    }
  }, [activeIndex, images])

  const addDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = picture1
  }

  const [randomData] = useState<Channel[]>(() => {
    const shuffledData = [...channelListData].sort(() => Math.random() - 0.5).slice(0, 4)
    return shuffledData
  })

  return (
    <CarouselContainer justify={'flex-start'} direction={'column'}>
      <ImageSlider ref={sliderRef}>
        {randomData.map((channel, index) => (
          <CarouselItem key={channel._id}>
            <Link to={`/posts/${channel._id}`} style={{ textDecoration: 'none' }}>
              <Image src={images[index]} alt={'img test'} onError={addDefaultImg} />
              <SpanWrapper>
                <Text typo={channelTypo} color={channelColor}>
                  {channel.name}
                </Text>
              </SpanWrapper>
            </Link>
          </CarouselItem>
        ))}
      </ImageSlider>

      <PageIndicator>
        {images.map((_, index) => (
          <PageDot
            key={index}
            active={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </PageIndicator>
    </CarouselContainer>
  )
}

const CarouselContainer = styled(FlexBox)`
  overflow: hidden;
  width: 100%;
  transition: transform 0.3s ease-in-out;
  position: relative;
`

const CarouselItem = styled.div`
  flex: 0 0 auto;
  width: 100%;
  transition: transform 0.3s ease-in-out;
  position: relative;
`
const SpanWrapper = styled.div`
  position: absolute;
  bottom: 50px;
  right: 20px;
`

const ImageSlider = styled.div`
  display: flex;
  transition: transform 0.3s linear;
  will-change: transform;
  backface-visibility: hidden;
  transform: translateZ(0);
`

const Image = styled.img`
  width: 100%;
  height: 190px;
  object-fit: cover;
  opacity: 0.4;
  content-visibility: auto;
`

const PageIndicator = styled(FlexBox)`
  position: absolute;
  bottom: 10%;
`

const PageDot = styled.div<{ active: boolean }>`
  width: 0.6em;
  height: 0.6em;
  background-color: ${({ active }) => (active ? `${palette.MAINBLUE}` : `${palette.GRAY600}`)};
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
`

export default Carousel
