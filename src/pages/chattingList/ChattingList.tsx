import styled from '@emotion/styled'
// import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Search from '@/assets/icons/Search'
import defaultProfileImage from '@/assets/images/defaultProfileImage.png'
import AppBar from '@/components/common/appBar'
import { FlexBox } from '@/components/common/flexBox'
import Input from '@/components/common/Input'
import ListRow from '@/components/common/ListRow'
import Spacing from '@/components/common/Spacing'
import { User } from '@/libs/apis/auth/authType'
import { axiosAPI } from '@/libs/apis/axios'
import { userAtom } from '@/libs/store/userAtom'

interface Conversation {
  _id: string
  message: string
  sender: User
  receiver: User
  seen: boolean
  createdAt: string
}
const ChattingList = () => {
  const userData = useAtomValue(userAtom)
  const [chattingList, setChattingList] = useState<Conversation[]>([])
  const navigate = useNavigate()
  const searchInputRef = useRef(null)

  const getChattingList = async () => {
    await axiosAPI
      .get('/messages/conversations')
      .then((response) => {
        console.log(response)

        setChattingList(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const moveChattingRoom = async (selectedChat: Conversation) => {
    navigate(`/chatting`, {
      state: {
        sender: selectedChat.sender,
        receiver: selectedChat.receiver,
        senderFullName: selectedChat.sender.fullName,
      },
    })
    await axiosAPI
      .put('/messages/update-seen', {
        sender: selectedChat.sender._id, // 사용자 id
      })
      .then((response) => {
        console.log(response)
      })
      .catch((err) => console.log(err))
  }
  const searchChattingList = () => {
    if (searchInputRef.current) console.log(searchInputRef.current.value)
  }
  useEffect(() => {
    getChattingList()
    console.log(userData)
  }, [])
  return (
    <StyleWrapper>
      <StyleChattingListWrapper>
        <AppBar mainPage={false} />
        <Spacing size={20} />
        <FlexBox direction={'row'} gap={20} fullWidth={true}>
          <StyleSearchArea>
            <Input placeholder={'대화 목록을 검색해보세요!'} ref={searchInputRef} />
            <StyleSearchIcon onClick={searchChattingList}>
              <Search />
            </StyleSearchIcon>
          </StyleSearchArea>
        </FlexBox>
        <Spacing size={30} />
        <StyleChattingItem>
          {chattingList &&
            chattingList.map((v, i) => (
              <StyleListRow
                key={v._id}
                onClick={() => {
                  moveChattingRoom(v)
                }}
              >
                <ListRow
                  rightElement={<div style={{ color: 'red' }}>{v.seen ? '' : 'new'}</div>}
                  leftImage={v.sender.image ? v.sender.image : defaultProfileImage}
                  mainText={v.sender.fullName}
                  subElement={v.message}
                  gap={10}
                  imageGap={10}
                  textColor={'GRAY600'}
                  textTypo={'Body_13'}
                />
              </StyleListRow>
            ))}
        </StyleChattingItem>
      </StyleChattingListWrapper>
    </StyleWrapper>
  )
}
const StyleChattingListWrapper = styled.div`
  .scroll::-webkit-scrollbar {
    display: none;
  }
`
const StyleListRow = styled.div`
  cursor: pointer;
`
const StyleSearchArea = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  text-align: center;
  padding: 0px 20px;
`
const StyleSearchIcon = styled.div`
  cursor: pointer;
`
const StyleChattingItem = styled.li`
  padding: 0px 20px;
  list-style: none;
`
const StyleWrapper = styled.div`
  flex-direction: column;
  height: 100%;
  align-items: center;
  gap: 20px;
`

export default ChattingList
