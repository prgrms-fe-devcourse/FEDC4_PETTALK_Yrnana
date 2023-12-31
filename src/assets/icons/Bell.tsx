import { ComponentProps } from 'react'

import { KeyOfPalette, theme } from '@/styles/theme'

interface IconProps extends ComponentProps<'div'> {
  width: number
  height: number
  fill: KeyOfPalette | 'none' | string
  stroke: KeyOfPalette | 'none' | string
}

const Bell = ({
  width = 28,
  height = 28,
  fill = 'none',
  stroke = `${theme.palette.BLACK}`,
  ...props
}: Partial<IconProps>) => {
  return (
    <span {...props}>
      <svg
        width={width}
        height={height}
        viewBox={'0 0 28 28'}
        fill={fill}
        xmlns={'http://www.w3.org/2000/svg'}
      >
        <path
          d={
            'M7.52248 9.29766C7.88922 5.99704 10.6791 3.5 14 3.5V3.5C17.3209 3.5 20.1108 5.99704 20.4775 9.29765L20.7713 11.9416C20.807 12.263 20.8249 12.4238 20.8489 12.582C20.9892 13.5064 21.2906 14.3991 21.7392 15.2195C21.816 15.3599 21.8992 15.4986 22.0656 15.7759L22.7399 16.8999C23.4925 18.1541 23.8687 18.7812 23.6349 19.267C23.6156 19.307 23.5937 19.3457 23.5693 19.3829C23.273 19.8333 22.5417 19.8333 21.0791 19.8333H6.92094C5.45832 19.8333 4.72701 19.8333 4.43071 19.3829C4.4063 19.3457 4.38439 19.307 4.36513 19.267C4.13129 18.7812 4.50755 18.1541 5.26006 16.8999L5.93443 15.7759C6.10083 15.4986 6.18404 15.3599 6.26083 15.2195C6.70945 14.3991 7.01077 13.5064 7.15111 12.582C7.17514 12.4238 7.193 12.263 7.22871 11.9416L7.52248 9.29766Z'
          }
          stroke={stroke}
          strokeWidth={'2'}
        />
        <path
          d={
            'M10.6193 20.6088C10.8187 21.7251 11.2581 22.7116 11.8693 23.4151C12.4806 24.1187 13.2295 24.5 14 24.5C14.7705 24.5 15.5194 24.1187 16.1307 23.4151C16.7419 22.7116 17.1813 21.7251 17.3807 20.6088'
          }
          stroke={stroke}
          strokeWidth={'2'}
          strokeLinecap={'round'}
        />
      </svg>
    </span>
  )
}

export default Bell
