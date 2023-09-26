import styled from '@emotion/styled'
import { ComponentProps } from 'react'

import { FlexBox } from '@/components/common/flexBox'
import { Text } from '@/components/common/Text'
import { KeyOfPalette, KeyOfTypo, theme } from '@/styles/theme'

export interface DateTimeProps extends ComponentProps<'div'> {
  typo?: KeyOfTypo
  color?: KeyOfPalette
  backgroundColor?: KeyOfPalette
  width?: number
  height?: number
  content: string
}

const Datetime = ({
  typo = 'SubHead_14',
  color = 'BLACK',
  backgroundColor = 'GRAY300',
  width = 220,
  height = 30,
  content,
}: DateTimeProps) => {
  return (
    <DateTimeWrapper backgroundColor={backgroundColor} width={width} height={height}>
      <Text typo={typo} color={color}>
        {content}
      </Text>
    </DateTimeWrapper>
  )
}

const DateTimeWrapper = styled(FlexBox)<{
  backgroundColor: KeyOfPalette
  width: number
  height: number
}>`
  background-color: ${({ backgroundColor }) => theme.palette[backgroundColor]};
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  padding: 15px;
  border-radius: 10px;
`

export default Datetime
