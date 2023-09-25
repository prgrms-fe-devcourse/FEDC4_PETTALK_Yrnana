import styled from '@emotion/styled'
import { useMutation } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '@/components/common/button'
import ProfileImage from '@/components/common/profileImage'
import Spacing from '@/components/common/spacing'
import { Text } from '@/components/common/text'
import { axiosAPI } from '@/libs/apis/axios'
import { useConfirmModal } from '@/libs/hooks/useConfirmModal'
import useModal from '@/libs/hooks/useModal'
import { userAtom } from '@/libs/store/userAtom'

const MyProfile = () => {
  const userData = useAtomValue(userAtom)
  const navigate = useNavigate()
  const { openModal } = useModal()
  const { openConfirmModal } = useConfirmModal()
  const logoutMutation = useMutation(async () => await axiosAPI.post('/logout'), {
    onSuccess: () => {
      openModal({ content: '로그아웃 완료! 다음에 만나요 🙌', type: 'success' })
      navigate('/login')
      localStorage.removeItem('isLogin')
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    },
    onError: () => {
      openModal({ content: '로그아웃 실패! 다시 시도해주세요🙏', type: 'error' })
    },
  })
  const Logout = () => {
    //confirm 창 만들면 변경
    if (window.confirm('로그아웃 하시겠습니까?')) {
      logoutMutation.mutate()
    }
  }

  return (
    <>
      <Spacing size={40} />
      <MyPageContainer>
        <Text typo={'Headline_25'}>{userData.fullName}</Text>
        <ProfileImage size={200} updatable={true} image={userData.image} />
        <Follows>
          <Follower>
            <Text typo={'Headline_25'}>{'팔로워'}</Text>
            <Spacing size={10} />
            <Text typo={'Headline_25'} color={'MAINBLUE'}>
              {userData.followers.length}
            </Text>
          </Follower>
          <Following>
            <Text typo={'Headline_25'}>{'팔로잉'}</Text>
            <Spacing size={10} />
            <Text typo={'Headline_25'} color={'MAINBLUE'}>
              {userData.following.length}
            </Text>
          </Following>
        </Follows>
      </MyPageContainer>
      <Button
        buttonType={'ExtraLarge'}
        value={'로그아웃'}
        backgroundColor={'WHITE'}
        style={{
          boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.4)',
          position: 'absolute',
          bottom: '20px',
        }}
        onClick={() =>
          openConfirmModal({
            confirmText: '로그아웃 하시겠습니까?',
            okFunc: () => logoutMutation.mutate(),
          })
        }
      />
    </>
  )
}

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
`

const Follows = styled.div`
  width: 48%;
  height: 25%;
  display: flex;
  justify-content: space-between;
`

const Follower = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Following = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default MyProfile
