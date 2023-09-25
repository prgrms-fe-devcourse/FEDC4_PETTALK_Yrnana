import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { FlexBox } from '@/components/common/flexBox'
import Loading from '@/components/common/loading'
import ProfileImage from '@/components/common/profileImage'
import Spacing from '@/components/common/spacing'
import { Text } from '@/components/common/text'
import { FriendListResponse } from '@/libs/apis/auth/authType'
import { UserApi } from '@/libs/apis/user/userApi'
interface OnlineFriendsProps {
  userList: FriendListResponse[]
  userFollowing: string[]
}

const OnlineFriends = ({ userList, userFollowing }: OnlineFriendsProps) => {
  const [myFollowing, setMyFollowing] = useState<FriendListResponse[]>([])
  const [onlineUser, setOnlineUser] = useState<string[]>([])

  useEffect(() => {
    const filtered = userList.filter((data) => userFollowing.includes(data._id))
    setMyFollowing([...filtered])
  }, [userFollowing])

  const { data, isLoading } = useQuery(['online'], () => UserApi.GET_ONLINE_USERS(), {
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
    retry: 3,
    onSuccess: (responseData) => {
      const followingOnline = responseData.filter((data) => userFollowing.includes(data._id))
      const onlineString = followingOnline.map((data) => data._id)
      setOnlineUser(onlineString)
    },
  })

  if (isLoading) {
    return <Loading />
  }

  return (
    <FlexBox direction={'column'} align={'flex-start'} fullWidth={true} gap={20}>
      <Text typo={'SubHead_18'}>{'활동 중인 친구'}</Text>
      <OnlineFriendsProfileWrapper length={data?.length}>
        {userFollowing?.length === 0 ? (
          <Text typo={'Body_16'} color={'GRAY500'}>
            {'팔로잉하고있는 유저가 없습니다.'}
          </Text>
        ) : (
          myFollowing?.map((data, index) => {
            return (
              <ProfileImage
                key={index}
                size={70}
                updatable={false}
                image={data.image}
                online={onlineUser.includes(data._id) ? true : false}
              />
            )
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
  justify-content: 'flex-start';
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
