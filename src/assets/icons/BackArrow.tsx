import { ComponentProps } from 'react'

import { KeyOfPalette, theme } from '@/styles/theme'

interface IconProps extends ComponentProps<'div'> {
  width: number
  height: number
  fill: KeyOfPalette | 'none' | string
  stroke: KeyOfPalette | 'none' | string
}

const BackArrow = ({
  width = 24,
  height = 24,
  fill = 'none',
  stroke = `${theme.palette.GRAY500}`,
  ...props
}: Partial<IconProps>) => {
  return (
    <span {...props}>
      <svg
        width={width}
        height={height}
        viewBox={'0 0 25 24'}
        fill={fill}
        xmlns={'http://www.w3.org/2000/svg'}
      >
        <path
          d={'M5.01392 12H19.0529'}
          stroke={stroke}
          strokeWidth={'1.6'}
          strokeLinecap={'round'}
          strokeLinejoin={'round'}
        />
        <path
          d={'M5.01392 12L11.0306 18'}
          stroke={stroke}
          strokeWidth={'1.6'}
          strokeLinecap={'round'}
          strokeLinejoin={'round'}
        />
        <path
          d={'M5.01392 12L11.0306 6'}
          stroke={stroke}
          strokeWidth={'1.6'}
          strokeLinecap={'round'}
          strokeLinejoin={'round'}
        />
      </svg>
    </span>
  )
}

export default BackArrow
