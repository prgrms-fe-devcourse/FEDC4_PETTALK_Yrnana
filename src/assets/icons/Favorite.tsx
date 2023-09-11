import { KeyOfPalette, theme } from '@/styles/theme'

type IconProps = {
  width: number
  height: number
  fill: KeyOfPalette | 'none' | string
  stroke: KeyOfPalette | 'none' | string
}

const Favorite = ({
  width = 20,
  height = 20,
  fill = 'none',
  stroke = `${theme.palette.GRAY700}`,
}: Partial<IconProps>) => {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.70881 11.5898L9.50266 17.0326C9.6478 17.1689 9.72038 17.2371 9.7993 17.2716C9.92718 17.3277 10.0727 17.3277 10.2005 17.2716C10.2795 17.2371 10.352 17.1689 10.4972 17.0326L16.291 11.5899C17.9212 10.0585 18.1191 7.53851 16.7481 5.7714L16.4903 5.43913C14.8501 3.32516 11.5579 3.67969 10.4055 6.09438C10.2427 6.43547 9.75716 6.43547 9.59436 6.09438C8.44189 3.67969 5.14969 3.32516 3.50954 5.43913L3.25174 5.7714C1.88071 7.53851 2.07867 10.0585 3.70881 11.5898Z"
        stroke={stroke}
        stroke-width="2"
      />
    </svg>
  )
}

export default Favorite
