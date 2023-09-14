import styled from '@emotion/styled'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '@/components/common/button'
import Greetings from '@/components/common/greetings'
import Input from '@/components/common/input'
import Loading from '@/components/common/loading'
import Spacing from '@/components/common/spacing'
import { Text } from '@/components/common/text'
import { axiosAPI } from '@/libs/apis/axios'
import { theme } from '@/styles/theme'

const Login = () => {
  const navigate = useNavigate()
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  const submitLogin = () => {
    if (emailInputRef.current && passwordInputRef.current) {
      setIsLoading(true)
      const body = {
        email: emailInputRef.current.value,
        password: passwordInputRef.current.value,
      }
      console.log(body)
      loginMutation.mutate(body)
    }
  }

  const loginPost = async (body: object) => {
    return await axiosAPI.post('/login', body)
  }

  const loginMutation = useMutation((body: object) => loginPost(body), {
    onSuccess: (data) => {
      console.log(data)
      setIsLoading(false)
      localStorage.setItem('token', data.data.token)
      localStorage.setItem('role', data.data.user.role)
      localStorage.setItem('isLogin', 'true')
      alert('로그인 성공')
      navigate('/')
    },
    onError: () => {
      setIsLoading(false)
      alert('아이디와 비밀번호를 확인해주세요!')
    },
  })

  const goRegisterPage = () => {
    navigate('/register')
  }

  const [loading, setLoading] = useState(true)
  const [animation, setAnimation] = useState(true)

  useEffect(() => {
    if (sessionStorage.getItem('visited')) {
      setLoading(false)
    } else {
      sessionStorage.setItem('visited', 'true')
      setTimeout(() => {
        setLoading(false)
      }, 12000)

      setTimeout(() => {
        setAnimation(false)
      }, 11000)
    }
  }, [])

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {' '}
      <StyleRegisterWrapper>
        {loading ? <Greetings className={animation ? '' : 'fade-out'} /> : ''}
        <Text typo={'LogoFont_50'}>{'Pet Talk'}</Text>
        <Spacing size={50} />
        <Input width={200} ref={emailInputRef} placeholder={'email'}></Input>
        <Spacing size={22} />
        <Input
          width={200}
          ref={passwordInputRef}
          placeholder={'password'}
          type={'password'}
        ></Input>
        <Spacing size={50} />
        <Button buttonType={'Large'} value={'로그인'} onClick={submitLogin}></Button>
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
  height: 100%;
  background-image: url('./src/assets/images/Background.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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
