/* eslint-disable prettier/prettier */
import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'
import { useState } from 'react'

import Search from '@/assets/icons/Search'
import { FlexBox } from '@/components/common/flexBox'
import Input from '@/components/common/input'
import FollowFriend from '@/components/friends/FollowFriend'
import OnlineFriends from '@/components/friends/OnlineFriends'
import { User } from '@/libs/apis/auth/authType'
import { UserApi } from '@/libs/apis/user/userApi'
import { userAtom } from '@/libs/store/userAtom'
const FriendList = () => {
  const { data } = useQuery(['userList'], () => UserApi.GET_USERS())
  const mydata = useAtomValue<User>(userAtom)
  const [followingList, setFollowingList] = useState<string[]>([])
  useEffect(() => {
    if (mydata.followers.length) {
      const followData = mydata.following.map((value) => value.user)
      setFollowingList(followData)
    }
  }, [mydata])
  return (
    <FriendListWrapper>
      <FlexBox direction={'row'} gap={10} fullWidth={true}>
        <Input placeholder={'유저명을 검색해보세요.'} />
        <Search />
      </FlexBox>
      <OnlineFriends />
      <FlexBox direction={'column'} fullWidth={true} gap={10}>
        {followingList.length === 0
          ? 'loading....'
          : data?.map((data, index) =>
            followingList.includes(data._id) ? (
              <FollowFriend key={index} data={data} follow={true} />
            ) : (
              <FollowFriend key={index} data={data} follow={false} />
            ),
          )}
      </FlexBox>
    </FriendListWrapper>
  )
}

export default FriendList

const FriendListWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 100%;
  align-items: center;
  gap: 20px;
  padding: 0px 10px 30px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0px;
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f2f2f2;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #999;
  }
`
