import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Search from '@/assets/icons/Search'
import defaultProfileImage from '@/assets/images/defaultProfileImage.png'
import { FlexBox } from '@/components/common/flexBox'
import Input from '@/components/common/input'
import ListRow from '@/components/common/listRow'
import Loading from '@/components/common/loading'
import Spacing from '@/components/common/spacing'
import { axiosAPI } from '@/libs/apis/axios'
import { Conversation } from '@/libs/apis/message/conversationType'
import MessageApi from '@/libs/apis/message/messageApi'
import { userAtom } from '@/libs/store/userAtom'
import { palette } from '@/styles/palette'

const ChattingList = () => {
  const userData = useAtomValue(userAtom)
  const [chattingList, setChattingList] = useState<Conversation[]>([])
  const [filteredChattingList, setFilteredChattingList] = useState<Conversation[]>([])
  const [searchMode, setSearchMode] = useState<boolean>(false)
  const navigate = useNavigate()
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const getChattingList = async () => {
    return await MessageApi.GET_MESSAGES()
  }
  const { data, isLoading } = useQuery(['chattingList'], () => getChattingList())

  const moveChattingRoom = async (selectedChat: Conversation) => {
    navigate(`/chatting`, {
      state: {
        sender: selectedChat.sender,
        receiver: selectedChat.receiver,
      },
    })

    await axiosAPI
      .put('/messages/update-seen', {
        sender: selectedChat.sender._id,
      })
      .then((response) => {
        console.log(response)
      })
      .catch((err) => console.log(err))

    // await MessageApi.READ_MESSAGE(selectedChat.sender._id)
  }
  const searchChattingList = () => {
    if (searchInputRef.current !== null) {
      const inputValue = searchInputRef.current.value
      const sourceList = data?.length !== 0 ? data : chattingList // Use data if available, else use chattingList
      const filteredList = sourceList!.filter(
        (chat) => chat.sender.fullName.includes(inputValue) || chat.message.includes(inputValue),
      )
      console.log('Filtered list:', filteredList)
      setFilteredChattingList(filteredList)
      setSearchMode(true)
    }
  }

  const findOpponent = (data: Conversation) => {
    if (data.sender._id === userData._id) return data.receiver
    else return data.sender
  }

  useEffect(() => {
    if (data !== undefined) {
      setChattingList(data)
      setFilteredChattingList(data) // Update filteredChattingList initially with data
    }
  }, [data])

  if (isLoading) return <Loading></Loading>

  return (
    <StyleWrapper justify={'flex-start'} direction={'column'} gap={20}>
      {isLoading ? (
        <Loading />
      ) : (
        <StyleChattingListWrapper>
          <FlexBox direction={'row'} gap={20} fullWidth={true}>
            <StyleSearchArea align={'center'} fullWidth={true}>
              <Input placeholder={'대화 목록을 검색해보세요!'} ref={searchInputRef} />
              <StyleSearchIcon onClick={searchChattingList}>
                <Search />
              </StyleSearchIcon>
            </StyleSearchArea>
          </FlexBox>
          <Spacing size={30} />
          <StyleChattingItem>
            {filteredChattingList && searchMode ? (
              filteredChattingList.length !== 0 ? (
                filteredChattingList.map((chat) => (
                  <StyleListRow
                    direction={'column'}
                    fullWidth={true}
                    gap={10}
                    key={chat._id[1]}
                    onClick={() => {
                      moveChattingRoom(chat)
                    }}
                  >
                    <ListRow
                      rightElement={<div style={{ color: 'red' }}>{chat.seen ? '' : 'new'}</div>}
                      leftImage={
                        findOpponent(chat).image ? findOpponent(chat).image : defaultProfileImage
                      }
                      mainText={findOpponent(chat).fullName}
                      subElement={chat.message}
                      gap={10}
                      imageGap={10}
                      textColor={'GRAY600'}
                      textTypo={'Body_13'}
                    />
                    <Stylehr />
                  </StyleListRow>
                ))
              ) : (
                <StyleNoData>{'검색 결과가 존재하지 않습니다!'}</StyleNoData>
              )
            ) : data?.length !== 0 ? (
              data?.map((chat: Conversation) => (
                <StyleListRow
                  direction={'column'}
                  fullWidth={true}
                  gap={10}
                  key={chat._id[1]}
                  onClick={() => {
                    moveChattingRoom(chat)
                  }}
                >
                  <ListRow
                    rightElement={<div style={{ color: 'red' }}>{chat.seen ? '' : 'new'}</div>}
                    leftImage={
                      findOpponent(chat).image ? findOpponent(chat).image : defaultProfileImage
                    }
                    mainText={findOpponent(chat).fullName}
                    subElement={chat.message}
                    gap={10}
                    imageGap={10}
                    textColor={'GRAY600'}
                    textTypo={'Body_13'}
                  />
                  <Stylehr />
                </StyleListRow>
              ))
            ) : (
              <StyleNoData>{'아직 대화내역이 없습니다!'}</StyleNoData>
            )}
          </StyleChattingItem>
        </StyleChattingListWrapper>
      )}
    </StyleWrapper>
  )
}
const StyleChattingListWrapper = styled.div`
  width: 100%;
`
const StyleListRow = styled(FlexBox)`
  cursor: pointer;
  margin: 10px 0px;
`
const Stylehr = styled.hr`
  border: 1px solid ${palette.GRAY300};
  width: 100%;
`
const StyleSearchArea = styled(FlexBox)`
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
const StyleNoData = styled.div`
  text-align: center;
  margin: 30px;
  ${({ theme }) => theme.typo.Body_16};
  color: ${palette.GRAY500};
`
const StyleWrapper = styled(FlexBox)`
  height: 100%;
`

export default ChattingList
