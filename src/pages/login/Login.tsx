import styled from '@emotion/styled'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '@/components/common/button'
import Input from '@/components/common/input'
import Spacing from '@/components/common/Spacing'
import { Text } from '@/components/common/text'
import { theme } from '@/styles/theme'

const Login = () => {
  const navigate = useNavigate()
  const emailInputRef = useRef(null)
  const passwordInputRef = useRef(null)

  const goLogin = () => {
    alert('로그인 성공')
  }
  const goRegisterPage = () => {
    navigate('/register')
  }
  return (
    <>
      <StyleRegisterWrapper>
        <Spacing size={50} />
        <Text typo={'LogoFont_50'}>{'Pet Talk'}</Text>
        <Spacing size={50} />
        <Input width={200} inputRef={emailInputRef} placeholder={'email'}></Input>
        <Spacing size={22} />
        <Input width={200} inputRef={passwordInputRef} placeholder={'password'}></Input>
        <Spacing size={50} />
        <Button buttonType={'Large'} value={'로그인'} onClick={goLogin}></Button>
        <StyleMoveToRegisterPage onClick={goRegisterPage}>
          {'회원가입'}
        </StyleMoveToRegisterPage>{' '}
      </StyleRegisterWrapper>
    </>
  )
}

const StyleRegisterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const StyleMoveToRegisterPage = styled.button`
  display: flex;
  justify-content: center;
  font-size: ${theme.typo.Caption_11};
  margin: 10px;
  text-decoration: underline;
  color: ${theme.palette.GRAY600};
`
export default Login
