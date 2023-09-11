import { KeyOfPalette, theme } from '@/styles/theme'

type IconProps = {
  width: number
  height: number
  fill: KeyOfPalette | 'none' | string
  stroke: KeyOfPalette | 'none' | string
}

const Moon = ({
  width = 23,
  height = 25,
  fill = `${theme.palette.GRAY400}`,
  stroke = `${theme.palette.GRAY400}`,
}: Partial<IconProps>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={'0 0 23 25'}
      fill={fill}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <g filter={'url(#filter0_d_192_3746)'}>
        <path
          fillRule={'evenodd'}
          clipRule={'evenodd'}
          d={
            'M12 15.8337C11.0119 15.8337 10.5179 15.8337 10.3972 15.5069C10.3909 15.4899 10.3856 15.4725 10.3812 15.4549C10.2967 15.117 10.848 14.7408 11.9506 13.9884C13.4897 12.9382 14.5 11.1704 14.5 9.16654C14.5 7.16263 13.4896 5.39472 11.9504 4.34454C11.872 4.29106 11.9052 4.16699 12 4.16699C15.2217 4.16699 17.8334 6.77866 17.8334 10.0003C17.8334 13.222 15.2217 15.8337 12 15.8337Z'
          }
          fill={'white'}
        />
        <path
          d={
            'M11.9504 4.34454L11.6122 4.84016L11.9504 4.34454ZM10.3812 15.4549L10.9633 15.3094L10.3812 15.4549ZM10.3972 15.5069L10.9601 15.299L10.3972 15.5069ZM11.6124 13.4928C12.9947 12.5496 13.9 10.9637 13.9 9.16654H15.1C15.1 11.377 13.9847 13.3268 12.2888 14.484L11.6124 13.4928ZM13.9 9.16654C13.9 7.36929 12.9946 5.78335 11.6122 4.84016L12.2886 3.84891C13.9846 5.0061 15.1 6.95597 15.1 9.16654H13.9ZM17.2334 10.0003C17.2334 7.11004 14.8903 4.76699 12 4.76699V3.56699C15.5531 3.56699 18.4334 6.44729 18.4334 10.0003H17.2334ZM12 15.2337C14.8903 15.2337 17.2334 12.8906 17.2334 10.0003H18.4334C18.4334 13.5534 15.5531 16.4337 12 16.4337V15.2337ZM11.6122 4.84016C11.3391 4.65379 11.2609 4.33464 11.3316 4.07691C11.4041 3.81299 11.6483 3.56699 12 3.56699V4.76699C12.2569 4.76699 12.4371 4.58302 12.4889 4.39451C12.5389 4.21218 12.4833 3.98181 12.2886 3.84891L11.6122 4.84016ZM12.2888 14.484C11.7234 14.8698 11.3463 15.1284 11.1143 15.33C10.9984 15.4307 10.9583 15.4843 10.9495 15.4989C10.9484 15.5007 10.9917 15.4233 10.9633 15.3094L9.7991 15.6005C9.72837 15.3176 9.80895 15.0664 9.92193 14.8791C10.0271 14.7047 10.1779 14.5539 10.3272 14.4242C10.6254 14.1651 11.0752 13.8593 11.6124 13.4928L12.2888 14.484ZM12 16.4337C11.5281 16.4337 11.1005 16.4354 10.781 16.3857C10.4669 16.3367 10.0137 16.2004 9.83437 15.7148L10.9601 15.299C10.9014 15.1401 10.7556 15.1672 10.9657 15.2C11.1704 15.2319 11.4838 15.2337 12 15.2337V16.4337ZM10.9633 15.3094C10.9624 15.3059 10.9613 15.3024 10.9601 15.299L9.83437 15.7148C9.82055 15.6773 9.80878 15.6392 9.7991 15.6005L10.9633 15.3094Z'
          }
          fill={fill}
        />
        <path
          d={
            'M7.4 10.2L7.4 10.2C7.50137 10.5041 7.55206 10.6562 7.60276 10.7225C7.80288 10.9843 8.19712 10.9843 8.39724 10.7225C8.44794 10.6562 8.49863 10.5041 8.6 10.2L8.6 10.2C8.68177 9.95468 8.72266 9.83201 8.77555 9.72099C8.97291 9.30672 9.30672 8.97291 9.72099 8.77555C9.83201 8.72266 9.95468 8.68177 10.2 8.6L10.2 8.6C10.5041 8.49863 10.6562 8.44794 10.7225 8.39724C10.9843 8.19712 10.9843 7.80288 10.7225 7.60276C10.6562 7.55206 10.5041 7.50137 10.2 7.4L10.2 7.4C9.95468 7.31822 9.83201 7.27734 9.72099 7.22445C9.30672 7.02709 8.97291 6.69329 8.77555 6.27901C8.72266 6.16799 8.68177 6.04532 8.6 5.8C8.49863 5.49588 8.44794 5.34382 8.39724 5.2775C8.19712 5.01569 7.80288 5.01569 7.60276 5.2775C7.55206 5.34382 7.50137 5.49588 7.4 5.8C7.31823 6.04532 7.27734 6.16799 7.22445 6.27901C7.02709 6.69329 6.69329 7.02709 6.27901 7.22445C6.16799 7.27734 6.04532 7.31823 5.8 7.4C5.49588 7.50137 5.34382 7.55206 5.2775 7.60276C5.01569 7.80288 5.01569 8.19712 5.2775 8.39724C5.34382 8.44794 5.49588 8.49863 5.8 8.6C6.04532 8.68177 6.16799 8.72266 6.27901 8.77555C6.69329 8.97291 7.02709 9.30672 7.22445 9.72099C7.27734 9.83201 7.31822 9.95468 7.4 10.2Z'
          }
          fill={'white'}
          stroke={stroke}
          strokeWidth={'1.2'}
        />
      </g>
      <defs>
        <filter
          id={'filter0_d_192_3746'}
          x={'-2'}
          y={'0'}
          width={'28'}
          height={'28'}
          filterUnits={'userSpaceOnUse'}
          colorInterpolationFilters={'sRGB'}
        >
          <feFlood floodOpacity={'0'} result={'BackgroundImageFix'} />
          <feColorMatrix
            in={'SourceAlpha'}
            type={'matrix'}
            values={'0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'}
            result={'hardAlpha'}
          />
          <feOffset dy={'4'} />
          <feGaussianBlur stdDeviation={'2'} />
          <feComposite in2={'hardAlpha'} operator={'out'} />
          <feColorMatrix type={'matrix'} values={'0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'} />
          <feBlend
            mode={'normal'}
            in2={'BackgroundImageFix'}
            result={'effect1_dropShadow_192_3746'}
          />
          <feBlend
            mode={'normal'}
            in={'SourceGraphic'}
            in2={'effect1_dropShadow_192_3746'}
            result={'shape'}
          />
        </filter>
      </defs>
    </svg>
  )
}

export default Moon