import styled from '@emotion/styled'
import { useAtomValue } from 'jotai'
import { useNavigate } from 'react-router-dom'

import Button from '@/components/common/button'
import ProfileImage from '@/components/common/profileImage'
import Spacing from '@/components/common/spacing'
import { Text } from '@/components/common/text'
import { userAtom } from '@/libs/store/userAtom'

const MyProfile = () => {
  const userData = useAtomValue(userAtom)
  const navigate = useNavigate()

  console.log(userData)

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
        onClick={() => navigate('/login')}
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
