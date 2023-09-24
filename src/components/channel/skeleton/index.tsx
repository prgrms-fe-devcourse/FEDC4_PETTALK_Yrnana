// Skeleton.tsx

import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'

interface SkeletonLoaderProps {
  width?: string
  height?: string
}

const shimmerAnimation = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`

const SkeletonLoaderWrapper = styled.div<SkeletonLoaderProps>`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '190px'};
  border-radius: 10px;
  background: linear-gradient(90deg, #f0f0f0, #e0e0e0, #f0f0f0);
  background-size: 2000px 100%;
  animation: ${shimmerAnimation} 2s infinite;
`

const Skeleton: React.FC<SkeletonLoaderProps> = ({ width, height }) => {
  return <SkeletonLoaderWrapper width={width} height={height} />
}

export default Skeleton
