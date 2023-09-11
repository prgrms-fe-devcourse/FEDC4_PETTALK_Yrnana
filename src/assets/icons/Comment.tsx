import { KeyOfPalette, theme } from '@/styles/theme'

type IconProps = {
  width: number
  height: number
  fill: KeyOfPalette | 'none' | string
  stroke: KeyOfPalette | 'none' | string
}

const Comment = ({
  width = 22,
  height = 22,
  fill = 'none',
  stroke = `${theme.palette.GRAY700}`,
}: Partial<IconProps>) => {
  return (
    <svg width={width} height={height} viewBox="0 0 22 22" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.7155 5.29657C18.3334 6.22139 18.3334 7.50881 18.3334 10.0837C18.3334 12.6585 18.3334 13.9459 17.7155 14.8707C17.448 15.2711 17.1042 15.6149 16.7038 15.8824C15.8959 16.4222 14.8113 16.4904 12.8334 16.4991V16.5003L11.82 18.5272C11.4822 19.2028 10.518 19.2028 10.1802 18.5272L9.16675 16.5003V16.4991C7.18885 16.4904 6.10423 16.4222 5.29632 15.8824C4.89596 15.6149 4.55221 15.2711 4.28469 14.8707C3.66675 13.9459 3.66675 12.6585 3.66675 10.0837C3.66675 7.50881 3.66675 6.22139 4.28469 5.29657C4.55221 4.8962 4.89596 4.55245 5.29632 4.28494C6.22114 3.66699 7.50857 3.66699 10.0834 3.66699H11.9167C14.4916 3.66699 15.779 3.66699 16.7038 4.28494C17.1042 4.55245 17.448 4.8962 17.7155 5.29657Z"
        stroke={stroke}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M8.25 8.25L13.75 8.25" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M8.25 11.917H11" stroke={stroke} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}

export default Comment
