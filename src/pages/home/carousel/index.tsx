import styled from '@emotion/styled'
import { useEffect, useRef, useState } from 'react'

import { FlexBox } from '@/components/common/flexBox'
import { palette } from '@/styles/palette'

const Carousel = ({ images }: { images: string[] }) => {
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
  }, [activeIndex])

  return (
    <CarouselContainer justify={'flex-start'} direction={'column'}>
      <ImageSlider ref={sliderRef}>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Image src={image} alt={`Image ${index}`} />
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
`

const ImageSlider = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
`

const Image = styled.img`
  width: 100%;
  height: 190px;
  object-fit: cover;
  opacity: 0.4;
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
