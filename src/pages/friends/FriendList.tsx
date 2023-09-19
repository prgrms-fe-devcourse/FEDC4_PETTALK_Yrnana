import styled from '@emotion/styled'

import Search from '@/assets/icons/Search'
import { FlexBox } from '@/components/common/flexBox'
import Input from '@/components/common/input'
import OnlineFriends from '@/components/friends/OnlineFriends'
const FriendList = () => {
  return (
    <FriendListWrapper>
      <FlexBox direction={'row'} gap={10} fullWidth={true}>
        <Input placeholder={'유저명을 검색해보세요.'} />
        <Search />
      </FlexBox>
      <OnlineFriends />
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
