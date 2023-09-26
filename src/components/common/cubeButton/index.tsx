import styled from '@emotion/styled'
import { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

import { FlexBox } from '@/components/common/flexBox'
import { Text } from '@/components/common/Text'
import { KeyOfPalette, KeyOfTypo, theme } from '@/styles/theme'

interface CubeButtonProps extends ComponentProps<'button'> {
  content: string
  path: string
  textTypo?: KeyOfTypo
  textColor?: KeyOfPalette
  backgroundColor?: KeyOfPalette
  shadowColor?: KeyOfPalette
}

/**
 * @param content : 채널에 대한 설명
 * @param path : 클릭시 이동 경로 지정
 * @param textTypo : content에 적용할 typo
 * @param textColor: content에 적용시킬 color
 * @param backgroundColor : 카드 element에 적용할 배경 color
 * @param shadowColor : 카드 element에 적용할 shadow color
 */

const CubeButton = ({
  content,
  path,
  textTypo = 'SubHead_18',
  textColor = 'BLACK',
  backgroundColor = 'WHITE',
  shadowColor = 'GRAY400',
}: CubeButtonProps) => {
  return (
    <CubeButtonWrapper
      content={content}
      backgroundColor={backgroundColor}
      shadowColor={shadowColor}
    >
      <Link to={path} style={{ textDecoration: 'none' }}>
        <TextWrapper justify={'flex-start'}>
          <StyledText typo={textTypo} color={textColor}>
            {content}
          </StyledText>
        </TextWrapper>
      </Link>
    </CubeButtonWrapper>
  )
}

const TextWrapper = styled(FlexBox)`
  text-align: start;
  padding: 10px;
  height: 100%;
`

const StyledText = styled(Text)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
`

const CubeButtonWrapper = styled.button<{
  shadowColor?: KeyOfPalette
  backgroundColor?: KeyOfPalette
}>`
  width: 100%;
  max-width: 210px;
  height: 86px;
  border-radius: 10px;
  background-color: ${({ backgroundColor }) => backgroundColor && theme.palette[backgroundColor]};
  box-shadow: ${({ shadowColor }) => shadowColor && `0px 4px 4px 0px rgba(0, 0, 0, 0.24)`};
`

export default CubeButton
