/* eslint-disable prettier/prettier */
import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { FlexBox } from '@/components/common/flexBox'
import Input from '@/components/common/Input'
import Loading from '@/components/common/loading'
import Spacing from '@/components/common/Spacing'
import { Text } from '@/components/common/Text'
import FollowFriend from '@/components/friends/FollowFriend'
import OnlineFriends from '@/components/friends/OnlineFriends'
import { FriendListResponse, User } from '@/libs/apis/auth/authType'
import { UserApi } from '@/libs/apis/user/userApi'
import { useDebounce } from '@/libs/hooks/useDebounce'
import { userAtom } from '@/libs/store/userAtom'

const FriendList = () => {
  const [keyword, setKeyword] = useState<string>('')
  const [friendList, setFriendList] = useState<FriendListResponse[]>([])
  const { data, isLoading } = useQuery(['userList'], () => UserApi.GET_USERS())
  const mydata = useAtomValue<User>(userAtom)
  const debouncedValue = useDebounce(keyword, 200)
  const [followingList, setFollowingList] = useState<string[]>([])
  useEffect(() => {
    if (mydata.following.length) {
      const followData = mydata.following.map((value) => value.user)
      setFollowingList(followData)
    }
  }, [mydata])

  useEffect(() => {
    if (data) {
      setFriendList(data)
      const followData = mydata.following.map((value) => value.user)
      setFollowingList(followData)
    }
  }, [data])

  const handleSearchFriend = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value)
      if (e.target.value === '' && data) {
        setFriendList(data)
        return
      }
      if (debouncedValue) fetchSearchData(debouncedValue)
    },
    [debouncedValue],
  )

  const fetchSearchData = async (keyword: string) => {
    const data = await UserApi.SERACH_USER(keyword)
    if (data) setFriendList(data)
  }

  useEffect(() => {
    if (debouncedValue) fetchSearchData(debouncedValue)
  }, [debouncedValue])

  if (isLoading) return <Loading />

  return (
    <FriendListWrapper>
      <FlexBox direction={'row'} gap={10} fullWidth={true}>
        <Input placeholder={'유저명을 검색해보세요.'} onChange={handleSearchFriend} />
      </FlexBox>
      {data && <OnlineFriends userList={data} userFollowing={followingList} />}
      <FlexBox direction={'column'} fullWidth={true} gap={10}>
        {friendList.length === 0 ? (
          <Text typo={'Body_16'} color={'GRAY500'}>
            {'유저가 없습니다'}
          </Text>
        ) : (
          friendList?.map((data, index) =>
            followingList.includes(data._id) ? (
              <FollowFriend key={index} data={data} follow={true} />
            ) : (
              <FollowFriend key={index} data={data} follow={false} />
            ),
          )
        )}
        <Spacing size={60} />
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
