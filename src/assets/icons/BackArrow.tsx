import { KeyOfPalette, theme } from '@/styles/theme'

type IconProps = {
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
}: Partial<IconProps>) => {
  return (
    <svg width={width} height={height} viewBox="0 0 25 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M5.01392 12H19.0529" stroke={stroke} stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <path
        d="M5.01392 12L11.0306 18"
        stroke={stroke}
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.01392 12L11.0306 6"
        stroke={stroke}
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default BackArrow
