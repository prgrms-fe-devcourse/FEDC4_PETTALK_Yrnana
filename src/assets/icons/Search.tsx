import { KeyOfPalette, theme } from '@/styles/theme'

type IconProps = {
  width: number
  height: number
  fill: KeyOfPalette | 'none' | string
  stroke: KeyOfPalette | 'none' | string
}

const Search = ({
  width = 25,
  height = 25,
  fill = `${theme.palette.GRAY700}`,
  stroke = `${theme.palette.GRAY600}`,
}: Partial<IconProps>) => {
  return (
    <svg width={width} height={height} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.28571 0C11.7484 0 14.1103 0.978313 15.8517 2.71972C17.5931 4.46113 18.5714 6.82299 18.5714 9.28571C18.5714 11.5857 17.7286 13.7 16.3429 15.3286L16.7286 15.7143H17.8571L25 22.8571L22.8571 25L15.7143 17.8571V16.7286L15.3286 16.3429C13.7 17.7286 11.5857 18.5714 9.28571 18.5714C6.82299 18.5714 4.46113 17.5931 2.71972 15.8517C0.978313 14.1103 0 11.7484 0 9.28571C0 6.82299 0.978313 4.46113 2.71972 2.71972C4.46113 0.978313 6.82299 0 9.28571 0ZM9.28571 2.85714C5.71429 2.85714 2.85714 5.71429 2.85714 9.28571C2.85714 12.8571 5.71429 15.7143 9.28571 15.7143C12.8571 15.7143 15.7143 12.8571 15.7143 9.28571C15.7143 5.71429 12.8571 2.85714 9.28571 2.85714Z"
        fill={fill}
      />
    </svg>
  )
}

export default Search
