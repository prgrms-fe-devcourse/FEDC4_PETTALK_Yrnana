import { KeyOfPalette, theme } from '@/styles/theme'

type IconProps = {
  width: number
  height: number
  fill: KeyOfPalette | 'none' | string
  stroke: KeyOfPalette | 'none' | string
}

const NthChannel = ({
  width = 51,
  height = 8,
  fill = `${theme.palette.GRAY600}`,
  stroke = `${theme.palette.GRAY600}`,
}: Partial<IconProps>) => {
  return (
    <svg width={width} height={height} viewBox="0 0 51 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="3.5" cy="4" rx="3.5" ry="4" fill={fill} />
      <ellipse cx="18.5" cy="4" rx="3.5" ry="4" fill={fill} />
      <ellipse cx="33.5" cy="4" rx="3.5" ry="4" fill={fill} />
      <ellipse cx="47.5" cy="4" rx="3.5" ry="4" fill={fill} />
    </svg>
  )
}

export default NthChannel
