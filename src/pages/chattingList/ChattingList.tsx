import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
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
import Loading from '@/components/common/loading'
import Spacing from '@/components/common/Spacing'
import { User } from '@/libs/apis/auth/authType'
import { axiosAPI } from '@/libs/apis/axios'
import { userAtom } from '@/libs/store/userAtom'
import { palette } from '@/styles/palette'
import { typo } from '@/styles/typo'

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
  const [filteredChattingList, setFilteredChattingList] = useState<Conversation[]>([])
  const [searchMode, setSearchMode] = useState(false)
  const navigate = useNavigate()
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const getChattingList = async () => {
    return await axiosAPI.get('/messages/conversations')
  }
  const { data, isLoading } = useQuery(['chattingList'], getChattingList)

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
  }
  const searchChattingList = () => {
    if (searchInputRef.current !== null) {
      setSearchMode(true)
      setFilteredChattingList(
        chattingList.filter(
          (v) =>
            v.sender.fullName.includes(searchInputRef.current.value) ||
            v.message.includes(searchInputRef.current.value),
        ),
      )
    }
  }
  useEffect(() => {
    if (data !== undefined) setChattingList(data?.data)
  }, [searchInputRef, filteredChattingList, chattingList])
  return (
    <StyleWrapper>
      {isLoading ? (
        <Loading />
      ) : (
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
            {filteredChattingList && searchMode ? (
              filteredChattingList.length !== 0 ? (
                filteredChattingList.map((v) => (
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
                ))
              ) : (
                <StyleNoData>{'검색 결과가 존재하지 않습니다!'}</StyleNoData>
              )
            ) : data?.data.length !== 0 ? (
              data?.data.map((v: Conversation) => (
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
              ))
            ) : (
              <StyleNoData>{'아직 대화내역이 없습니다!'}</StyleNoData>
            )}

            <hr style={{ borderStyle: 'solid', borderColor: `${palette.GRAY300}` }} />
          </StyleChattingItem>
        </StyleChattingListWrapper>
      )}
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
  margin: 13px 0px;
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
const StyleNoData = styled.div`
  text-align: center;
  margin: 30px;
  font-size: ${typo.Body_16};
  color: ${palette.GRAY600};
`
const StyleWrapper = styled.div`
  flex-direction: column;
  height: 100%;
  align-items: center;
  gap: 20px;
`

export default ChattingList
