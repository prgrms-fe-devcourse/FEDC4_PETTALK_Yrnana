import styled from '@emotion/styled'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '@/components/common/button'
import Input from '@/components/common/input'
import Spacing from '@/components/common/Spacing'
import { Text } from '@/components/common/text'
import { axiosAPI } from '@/libs/apis/axios'
import { theme } from '@/styles/theme'

const Login = () => {
  const navigate = useNavigate()
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const goLogin = () => {
    alert('로그인 성공')
    if (emailInputRef.current && passwordInputRef.current) {
      const body = {
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      }
      axiosAPI
        .post('/login', body)
        .then((response) => {
          console.log(response)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('isLogin', 'true')
        })
        .catch((err) => {
          if (err.message === 'Request failed with status code 400')
            alert('아이디와 비밀번호를 확인해주세요!')
        })
      navigate('/')
    }
  }
  const goRegisterPage = () => {
    navigate('/register')
  }
  return (
    <>
      <StyleRegisterWrapper>
        <Text typo={'LogoFont_50'}>{'Pet Talk'}</Text>
        <Spacing size={50} />
        <Input width={200} inputRef={emailInputRef} placeholder={'email'}></Input>
        <Spacing size={22} />
        <Input
          width={200}
          inputRef={passwordInputRef}
          placeholder={'password'}
          type={'password'}
        ></Input>
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
  height: 90%;
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
