import { KeyOfPalette, theme } from '@/styles/theme'

type IconProps = {
  width: number
  height: number
  fill: KeyOfPalette | 'none' | string
  stroke: KeyOfPalette | 'none' | string
}

const Sun = ({
  width = 24,
  height = 24,
  fill = 'none',
  stroke = `${theme.palette.GRAY400}`,
}: Partial<IconProps>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={'0 0 24 24'}
      fill={fill}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <circle cx={'12'} cy={'12'} r={'3'} stroke={stroke} strokeWidth={'2'} />
      <path d={'M12 5V3'} stroke={stroke} strokeWidth={'2'} strokeLinecap={'round'} />
      <path d={'M12 21V19'} stroke={stroke} strokeWidth={'2'} strokeLinecap={'round'} />
      <path
        d={'M16.9498 7.05026L18.364 5.63605'}
        stroke={stroke}
        strokeWidth={'2'}
        strokeLinecap={'round'}
      />
      <path
        d={'M5.63608 18.364L7.05029 16.9498'}
        stroke={stroke}
        strokeWidth={'2'}
        strokeLinecap={'round'}
      />
      <path d={'M19 12L21 12'} stroke={stroke} strokeWidth={'2'} strokeLinecap={'round'} />
      <path d={'M3 12L5 12'} stroke={stroke} strokeWidth={'2'} strokeLinecap={'round'} />
      <path
        d={'M16.9498 16.9497L18.364 18.364'}
        stroke={stroke}
        strokeWidth={'2'}
        strokeLinecap={'round'}
      />
      <path
        d={'M5.63608 5.63602L7.05029 7.05023'}
        stroke={stroke}
        strokeWidth={'2'}
        strokeLinecap={'round'}
      />
    </svg>
  )
}

export default Sun
