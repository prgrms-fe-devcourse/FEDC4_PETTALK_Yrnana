import styled from '@emotion/styled'
import { ComponentProps } from 'react'

import Footprint from '@/assets/icons/Footprint'
import { FlexBox } from '@/components/common/flexBox'
import { Text } from '@/components/common/Text'
import { KeyOfPalette, KeyOfTypo } from '@/styles/theme'

interface InterestHeaderProps extends ComponentProps<'div'> {
  typo?: KeyOfTypo
  color?: KeyOfPalette
}

const InterestHeader = ({ typo = 'Headline_20', color = 'BLACK' }: InterestHeaderProps) => {
  return (
    <FlexBox justify={'flex-start'} gap={10}>
      <StyledHeader typo={typo} color={color}>
        {'관심사에 맞는 채널을 탐색해보세요.'}
      </StyledHeader>
      <IconWrapper>
        <FirstIcon>
          <Footprint />
        </FirstIcon>
        <SecondIcon>
          <Footprint />
        </SecondIcon>
      </IconWrapper>
    </FlexBox>
  )
}

const StyledHeader = styled(Text)`
  width: 55%;
  line-height: 1.3;
  word-break: keep-all;
`

const IconWrapper = styled.div`
  position: relative;
`
const FirstIcon = styled.div`
  position: absolute;
  bottom: 2px;
`

const SecondIcon = styled.div`
  position: absolute;
  left: 20px;
  top: 2px;
`

export default InterestHeader
