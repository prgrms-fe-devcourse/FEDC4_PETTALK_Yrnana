import { KeyOfPalette, theme } from '@/styles/theme'

type IconProps = {
  width: number
  height: number
  fill: KeyOfPalette | 'none' | string
  stroke: KeyOfPalette | 'none' | string
}

const Chat = ({
  width = 27,
  height = 27,
  fill = 'none',
  stroke = `${theme.palette.GRAY700}`,
}: Partial<IconProps>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={'0 0 27 27'}
      fill={fill}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <path
        d={
          'M4.5 13.5C4.5 8.52944 8.52944 4.5 13.5 4.5V4.5C18.4706 4.5 22.5 8.52944 22.5 13.5V19.2273C22.5 20.4161 22.5 21.0105 22.2554 21.4585C22.0716 21.795 21.795 22.0716 21.4585 22.2554C21.0105 22.5 20.4161 22.5 19.2273 22.5H13.5C8.52944 22.5 4.5 18.4706 4.5 13.5V13.5Z'
        }
        stroke={stroke}
        strokeWidth={'2'}
      />
      <path
        d={'M10.125 13.5L16.875 13.5'}
        stroke={stroke}
        strokeWidth={'2'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
      <path
        d={'M13.5 10.125L13.5 16.875'}
        stroke={stroke}
        strokeWidth={'2'}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
      />
    </svg>
  )
}

export default Chat
