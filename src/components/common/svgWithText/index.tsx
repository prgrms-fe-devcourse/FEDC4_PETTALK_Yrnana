import { ReactElement } from 'react'

import { FlexBox } from '@/components/common/flexBox'
import { Text } from '@/components/common/text'

interface SvgWithTextProps {
  svgComponent: ReactElement
  text: string | number
}

const SvgWithText = ({ svgComponent, text }: SvgWithTextProps) => {
  return (
    <FlexBox direction={'row'} gap={5}>
      {svgComponent}
      <Text typo={'Body_12'} color={'GRAY500'}>
        {text}
      </Text>
    </FlexBox>
  )
}

export default SvgWithText
