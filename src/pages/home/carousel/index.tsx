import styled from '@emotion/styled'
import React, { useEffect, useRef, useState } from 'react'

const CarouselContainer = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  transition: transform 0.3s ease-in-out;
  position: relative;
`

const CarouselItem = styled.div`
  flex: 0 0 auto;
  transition: transform 0.3s ease-in-out;
  width: 100%; /* 이미지 너비를 100%로 설정 */
`

const CarouselButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

const PrevButton = styled(CarouselButton)`
  left: 0;
  z-index: 1;
`

const NextButton = styled(CarouselButton)`
  right: 0;
`

const Carousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 1500)

    return () => {
      clearInterval(interval)
    }
  }, [activeIndex])

  useEffect(() => {
    if (sliderRef.current) {
      const imageWidth = sliderRef.current.offsetWidth // 이미지 너비를 캐러셀 컨테이너의 너비로 설정
      sliderRef.current.style.transform = `translateX(-${activeIndex * imageWidth}px)`
    }
  }, [activeIndex])

  return (
    <CarouselContainer>
      <PrevButton onClick={handlePrev}>{'이전'}</PrevButton>
      <div
        ref={sliderRef}
        style={{
          display: 'flex',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <img
              src={image}
              alt={`Image ${index}`}
              style={{ width: '100%', height: '190px', objectFit: 'cover' }}
            />
          </CarouselItem>
        ))}
      </div>
      <NextButton onClick={handleNext}>{'다음'}</NextButton>
    </CarouselContainer>
  )
}

export default Carousel
