import styled from '@emotion/styled'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import BackgroundImage from '@/assets/images/Background-nofootPrint.svg'
import Button from '@/components/common/button'
import Input from '@/components/common/input'
import Loading from '@/components/common/loading'
import Spacing from '@/components/common/spacing'
import { Text } from '@/components/common/text'
import { SignUpResponse } from '@/libs/apis/auth/authType'
import { axiosAPI } from '@/libs/apis/axios'
import useModal from '@/libs/hooks/useModal'
import { theme } from '@/styles/theme'

const Register = () => {
  const navigate = useNavigate()
  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)
  const userNameInputRef = useRef<HTMLInputElement>(null)
  const [checkBox1, setCheckBox1] = useState(false)
  const [checkBox2, setCheckBox2] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { openModal } = useModal()

  useEffect(() => {}, [checkBox1, checkBox2])

  const formValidation = () => {
    if (emailInputRef.current && emailInputRef.current.value == '') {
      openModal({
        content: '이메일을 입력하세요.',
        type: 'warning',
      })
      return false
    } else if (passwordInputRef.current && passwordInputRef.current.value == '') {
      openModal({
        content: '비밀번호를 입력하세요.',
        type: 'warning',
      })
      return false
    } else if (userNameInputRef.current && userNameInputRef.current.value == '') {
      openModal({
        content: '이름을 입력하세요.',
        type: 'warning',
      })
      return false
    } else if (passwordInputRef.current && !checkPassword(passwordInputRef.current.value)) {
      openModal({
        content: '비밀번호는 영문자, 숫자, 특수문자를 포함한 8자리 이상이어야 합니다.',
        type: 'warning',
      })
      return false
    } else if (emailInputRef.current && !checkEmail(emailInputRef.current.value)) {
      openModal({
        content: '유효한 이메일을 입력해주세요!',
        type: 'warning',
      })
      return false
    } else return true
  }

  const checkEmail = (emailValue: string) => {
    const regexpEmail =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
    return regexpEmail.test(emailValue)
  }

  const checkPassword = (passwordValue: string): boolean => {
    const regexpPassword = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    if (regexpPassword.test(passwordValue)) return true
    return false
  }

  const submitRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formValidation()) return
    if (checkBox1 == false || checkBox2 == false) {
      openModal({ content: '약관 동의에 체크해주세요.', type: 'warning' })
      return
    }
    setIsLoading(true)
    if (formValidation()) {
      if (emailInputRef.current && passwordInputRef.current && userNameInputRef.current) {
        const body = {
          email: emailInputRef.current.value,
          fullName: userNameInputRef.current.value,
          password: passwordInputRef.current.value,
        }
        registerMutation.mutate(body)
      }
    }
  }
  const registerPost = async (body: object): Promise<SignUpResponse | undefined> => {
    return await axiosAPI.post('/signup', body)
  }
  const registerMutation = useMutation((body: object) => registerPost(body), {
    onSuccess: () => {
      setIsLoading(false)
      openModal({ content: '회원가입 성공!', type: 'success' })
      navigate('/login')
    },
    onError: () => {
      setIsLoading(false)
      openModal({ content: '회원가입 실패! 이미 있는 계정입니다.', type: 'error' })
    },
  })

  const goLoginPage = () => {
    navigate('/login')
  }
  const checkHandler1 = (checked: boolean) => {
    checked ? setCheckBox1(true) : setCheckBox1(false)
  }

  const checkHandler2 = (checked: boolean) => {
    checked ? setCheckBox2(true) : setCheckBox2(false)
  }
  return isLoading ? (
    <Loading />
  ) : (
    <StyleRegisterWrapper image={BackgroundImage}>
      <Text typo={'LogoFont_50'}>{'Pet Talk'}</Text>
      <Spacing size={50} />
      <Input width={200} ref={emailInputRef} placeholder={'email'}></Input>
      <Spacing size={15} />
      <Input width={200} ref={passwordInputRef} placeholder={'password'} type={'password'}></Input>
      <Spacing size={15} />
      <Input width={200} ref={userNameInputRef} placeholder={'user name'}></Input>
      <Spacing size={15} />
      <StyleAreement>
        <StyleLabel>
          <StyledInput
            type={'checkbox'}
            onChange={(e) => {
              checkHandler1(e.target.checked)
            }}
          ></StyledInput>
          <StyleText>{'서비스 이용약관 동의'}</StyleText>
        </StyleLabel>
      </StyleAreement>
      <StyleAreement>
        <StyleLabel>
          <StyledInput
            type={'checkbox'}
            onChange={(e) => {
              checkHandler2(e.target.checked)
            }}
          ></StyledInput>
          <StyleText>{'개인정보 수집 및 활용 동의'}</StyleText>
        </StyleLabel>
      </StyleAreement>
      <Spacing size={22} />
      <Button buttonType={'Large'} value={'회원가입'} onClick={(e) => submitRegister(e)}></Button>
      <StyleMoveToRegisterPage onClick={goLoginPage}>
        {'계정이 이미 있으신가요?'}
      </StyleMoveToRegisterPage>{' '}
    </StyleRegisterWrapper>
  )
}

const StyleRegisterWrapper = styled.div<{ image: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  background-image: url('./src/assets/images/Background-nofootPrint.svg');
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

const StyleAreement = styled.div`
  display: flex;
  font-size: ${theme.typo.Caption_11};
  align-items: center;
  margin: 2px;
`
const StyleLabel = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
`

const StyledInput = styled.input`
  appearance: none;
  border: 1px solid ${theme.palette.GRAY400};
  border-radius: 50px;
  width: 15px;
  height: 15px;
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    border-radius: 50px;
    background-color: ${theme.palette.MAINBLUE};
  }
  &:hover {
    cursor: pointer;
  }
`
const StyleText = styled.span`
  &:hover {
    cursor: pointer;
  }
`

export default Register
