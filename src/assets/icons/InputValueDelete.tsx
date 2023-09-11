import { KeyOfPalette, theme } from '@/styles/theme'

type IconProps = {
  width: number
  height: number
  fill: KeyOfPalette | 'none' | string
  stroke: KeyOfPalette | 'none' | string
}

const InputValueDelete = ({
  width = 15,
  height = 15,
  fill = `${theme.palette.BEIGE}`,
  stroke = `${theme.palette.GRAY600}`,
}: Partial<IconProps>) => {
  return (
    <svg width={width} height={height} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7.5" cy="7.5" r="7.5" fill={fill} />
      <path d="M4.77271 10.227L10.2273 4.77246" stroke="white" stroke-width="2" />
      <path d="M4.77271 4.77246L10.2273 10.227" stroke="white" stroke-width="2" />
    </svg>
  )
}

export default InputValueDelete
