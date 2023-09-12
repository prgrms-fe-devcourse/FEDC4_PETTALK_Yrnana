import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'

const CarouselContainer = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  transition: transform 0.3s ease-in-out;
  position: relative;
`

const CarouselItem = styled.div`
  flex: 0 0 480px; /* 수정된 부분 */
  transition: transform 0.3s ease-in-out;
  margin: 0 auto; /* 이미지를 가로 중앙으로 정렬합니다. */
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

  return (
    <CarouselContainer>
      <PrevButton onClick={handlePrev}>{'이전'}</PrevButton>
      <div
        style={{
          display: 'flex',
          transform: `translateX(-${activeIndex * 480}px)` /* 수정된 부분 */,
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
