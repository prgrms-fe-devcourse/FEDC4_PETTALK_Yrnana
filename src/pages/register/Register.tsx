import styled from '@emotion/styled'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '@/components/common/button'
import Input from '@/components/common/input'
import Spacing from '@/components/common/Spacing'
import { Text } from '@/components/common/text'
import { theme } from '@/styles/theme'

const Register = () => {
  const navigate = useNavigate()
  const emailInputRef = useRef(null)
  const passwordInputRef = useRef(null)
  const userNameInputRef = useRef(null)

  const goRegister = () => {
    alert('회원가입 성공')
  }
  const goLoginPage = () => {
    navigate('/login')
  }

  return (
    <StyleRegisterWrapper>
      <Spacing size={50} />
      <Text typo={'LogoFont_50'}>{'Pet Talk'}</Text>
      <Spacing size={50} />
      <Input width={200} inputRef={emailInputRef} placeholder={'email'}></Input>
      <Spacing size={22} />
      <Input width={200} inputRef={passwordInputRef} placeholder={'password'}></Input>
      <Spacing size={22} />
      <Input width={200} inputRef={userNameInputRef} placeholder={'user name'}></Input>
      <Spacing size={22} />
      <StyleAreement>{'서비스 이용약관 동의'}</StyleAreement>
      <StyleAreement>{'개인정보 수집 및 활용 동의'}</StyleAreement>
      <Spacing size={50} />
      <Button buttonType={'Large'} value={'회원가입'} onClick={goRegister}></Button>
      <StyleMoveToRegisterPage onClick={goLoginPage}>
        {'계정이 이미 있으신가요?'}
      </StyleMoveToRegisterPage>{' '}
    </StyleRegisterWrapper>
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

const StyleAreement = styled.div`
  display: flex;
  font-size: ${theme.typo.Caption_11};
  align-items: center;
  margin: 2px;
`
export default Register
