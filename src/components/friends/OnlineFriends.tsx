import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'

import { FlexBox } from '@/components/common/flexBox'
import ProfileImage from '@/components/common/profileImage'
import Spacing from '@/components/common/spacing'
import { Text } from '@/components/common/text'
import { UserApi } from '@/libs/apis/user/userApi'

//TODO: 온라인 유저 폴링, 변화 있을때만 재랜더링
const OnlineFriends = () => {
  const { data } = useQuery(['userList'], () => UserApi.GET_USERS())
  //const { onlineUser } = useQuery(['online'], () => UserApi.GET_ONLINE_USERS())
  return (
    <FlexBox direction={'column'} align={'flex-start'} fullWidth={true} gap={20}>
      <Text typo={'SubHead_18'}>{'활동 중인 친구'}</Text>
      <OnlineFriendsProfileWrapper length={data?.length}>
        {data?.length === 0 ? (
          <Text typo={'Body_16'} color={'GRAY500'}>
            {'활동중인 유저가 없습니다.'}
          </Text>
        ) : (
          data?.map((data, index) => {
            return <ProfileImage key={index} size={70} updatable={false} image={data.image} />
          })
        )}
      </OnlineFriendsProfileWrapper>
      <Spacing size={1} color={'GRAY400'} />
    </FlexBox>
  )
}

export default OnlineFriends

const OnlineFriendsProfileWrapper = styled.div<{ length: number | undefined }>`
  display: flex;
  align-items: center;
  gap: 15px;
  flex-direction: row;
  width: 100%;
  overflow-x: scroll;
  height: 80px;
  border-radius: 20px;
  justify-content: ${({ length }) => (length === 0 ? 'center' : 'flex-start')};
  &::-webkit-scrollbar {
    width: 0px;
    height: 2px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 10px;
  }
`
