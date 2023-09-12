import styled from '@emotion/styled'
import { useEffect, useState } from 'react'

const ProgressContainer = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 16px;
`

const Rail = styled.div`
  position: absolute;
  top: 6px;
  left: 0;
  width: 100%;
  height: 6px;
  border-radius: 2px;
  background-color: #aaa;
`

const Track = styled.div`
  position: absolute;
  top: 6px;
  left: 0;
  width: 0;
  height: 6px;
  border-radius: 2px;
  background-color: #ffffff;
  transition: width 0.5s linear;
`

interface LoadingProp {
  loading: boolean
}

const Progress = ({ loading }: LoadingProp) => {
  const [value, setValue] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (value < 100) {
        setValue((prevValue) => prevValue + 10)
      } else {
        clearInterval(interval)
      }
    }, 500)

    return () => {
      clearInterval(interval)
    }
  }, [value])

  return (
    <ProgressContainer className={loading ? '' : 'wave'}>
      <Rail />
      <Track style={{ width: `${value}%` }} />
    </ProgressContainer>
  )
}

export default Progress
