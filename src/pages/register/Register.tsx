import { KeyOfPalette, KeyOfTypo, theme } from '@/styles/theme'
import styled from '@emotion/styled'
import { Text } from '@/components/common/Text'

const Register = () => {
  return (
    <RouterWrapper>
      <Text typo={'Headline_20'} color={'BLACK'}>
        하이루~~{' '}
      </Text>
      <Text typo={'Body_20'}>ㅇㅇ</Text>
      <Text
        typo={'Body_13'}
        color={'BLACK'}
        onClick={() => {
          console.log('밥사주세요')
        }}
      >
        ㅇㅇㅇ
      </Text>
    </RouterWrapper>
  )
}
export default Register

const RouterWrapper = styled.div`
  color: ${theme.palette.BACKGROUND};
  background: ${theme.palette.BEIGE};
`

const MyText = styled.div<{
  typo: KeyOfTypo
  color: KeyOfPalette
}>`
  ${({ typo }) => theme.typo[typo]}
  color: ${({ color }) => theme.palette[color]}
`
