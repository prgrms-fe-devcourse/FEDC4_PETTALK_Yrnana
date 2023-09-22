import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

import NotFoundImage from '@/assets/images/notFound.png'
import Button from '@/components/common/button'
import Spacing from '@/components/common/spacing'
import { Text } from '@/components/common/text'

const NotFoundPage = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <Image src={NotFoundImage} />
      <Spacing size={30} />
      <Text typo={'Headline_25'}>{'페이지를 찾을 수 없습니다!'}</Text>
      <Button
        buttonType={'ExtraLarge'}
        value={'홈으로'}
        onClick={() => navigate('/')}
        backgroundColor={'WHITE'}
        style={{
          boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.4)',
          position: 'absolute',
          bottom: '20px',
        }}
      />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Image = styled.img``

export default NotFoundPage
