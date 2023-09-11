import { Text } from '@/components/common/Text'
import { KeyOfPalette, KeyOfTypo, theme } from '@/styles/theme'
import styled from '@emotion/styled'
import { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

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
    <CubeButtonWrapper content={content} backgroundColor={backgroundColor} shadowColor={shadowColor}>
      <Link to={path} style={{ textDecoration: 'none' }}>
        <TextWrapper>
          <Text typo={textTypo} color={textColor}>
            {content}
          </Text>
        </TextWrapper>
      </Link>
    </CubeButtonWrapper>
  )
}

const CubeButtonWrapper = styled.button<{ shadowColor?: KeyOfPalette; backgroundColor?: KeyOfPalette }>`
  width: 160px;
  height: 86px;
  border-radius: 10px;
  background-color: ${({ backgroundColor }) => backgroundColor && theme.palette[backgroundColor]};
  box-shadow: ${({ shadowColor }) => shadowColor && `0px 4px 4px 0px rgba(0, 0, 0, 0.24)`};
  word-break: keep-all;
`

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  text-align: start;
  padding: 10px;
  height: 100%;
`

export default CubeButton
