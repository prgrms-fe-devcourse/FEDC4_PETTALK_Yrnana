import { ComponentProps } from 'react'

import { KeyOfPalette, theme } from '@/styles/theme'

interface IconProps extends ComponentProps<'div'> {
  width: number
  height: number
  fill: KeyOfPalette | 'none' | string
  stroke: KeyOfPalette | 'none' | string
}

const Send = ({
  width = 26,
  height = 26,
  fill = `${theme.palette.GRAY700}`,
  stroke = `${theme.palette.GRAY600}`,
  ...props
}: Partial<IconProps>) => {
  return (
    <div {...props}>
      <svg
        width={width}
        height={height}
        viewBox={'0 0 26 26'}
        fill={'none'}
        xmlns={'http://www.w3.org/2000/svg'}
      >
        <path
          fillRule={'evenodd'}
          clipRule={'evenodd'}
          d={
            'M10.8559 13.7293L7.85868 12.7302C5.50546 11.9458 4.32886 11.5536 4.32886 10.8329C4.32886 10.1121 5.50546 9.7199 7.85868 8.93549L17.8718 5.59777C19.5276 5.04584 20.3555 4.76988 20.7925 5.20689C21.2296 5.64391 20.9536 6.4718 20.4017 8.12759L17.0639 18.1408C16.2795 20.494 15.8873 21.6706 15.1666 21.6706C14.4458 21.6706 14.0536 20.494 13.2692 18.1408L12.2701 15.1435L16.957 10.4566C17.3475 10.0661 17.3475 9.43294 16.957 9.04242C16.5665 8.65189 15.9333 8.65189 15.5428 9.04242L10.8559 13.7293Z'
          }
          fill={fill}
        />
      </svg>
    </div>
  )
}

export default Send
