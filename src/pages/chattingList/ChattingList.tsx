import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Search from '@/assets/icons/Search'
import defaultProfileImage from '@/assets/images/defaultProfileImage.png'
import { FlexBox } from '@/components/common/flexBox'
import Input from '@/components/common/input'
import ListRow from '@/components/common/listRow'
import Loading from '@/components/common/loading'
import Spacing from '@/components/common/spacing'
import { Conversation } from '@/libs/apis/message/conversationType'
import MessageApi from '@/libs/apis/message/messageApi'
import { useDebounce } from '@/libs/hooks/useDebounce'
import { userAtom } from '@/libs/store/userAtom'
import { palette } from '@/styles/palette'

const ChattingList = () => {
  const userData = useAtomValue(userAtom)
  const [keyword, setKeyword] = useState<string>('')
  const [filteredChattingList, setFilteredChattingList] = useState<Conversation[]>([])
  const navigate = useNavigate()
  const debouncedValue = useDebounce(keyword, 200)
  const searchInputRef = useRef<HTMLInputElement | null>(null)

  const { data, isLoading } = useQuery(['chattingList'], MessageApi.GET_MESSAGES, {
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
    retry: 3,
    onSuccess: async (responseData: Conversation[]) => {
      if (responseData.length > 0) {
        await MessageApi.READ_MESSAGE(responseData[responseData.length - 1].sender._id)
      }
    },
    cacheTime: 0,
  })

  const moveChattingRoom = async (selectedChat: Conversation) => {
    navigate(`/chatting`, {
      state: {
        sender: selectedChat.sender,
        receiver: selectedChat.receiver,
      },
    })

    await MessageApi.READ_MESSAGE(selectedChat.sender._id)
  }

  const fetchSearchData = async (keyword: string) => {
    const searched = await MessageApi.SEARCH_USER(keyword)
    const filteredData = searched.filter((data) => 'fullName' in data)
    const userIdData = filteredData.map((data) => data._id)
    if (data) {
      const newUserList = data.filter(
        (data) => userIdData.includes(data.sender._id) || userIdData.includes(data.receiver._id),
      )
      setFilteredChattingList(newUserList)
    }
  }

  const handleSearchChat = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value)
      if (e.target.value === '' && data) {
        setFilteredChattingList(data)
        return
      }
      if (debouncedValue) {
        fetchSearchData(debouncedValue)
      }
    },
    [debouncedValue],
  )

  const findOpponent = (data: Conversation) => {
    if (data.sender._id === userData._id) return data.receiver
    else return data.sender
  }

  useEffect(() => {
    if (data) {
      setFilteredChattingList(data)
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
              <Input
                placeholder={'대화 목록을 검색해보세요'}
                ref={searchInputRef}
                onChange={handleSearchChat}
              />
              {/* <StyleSearchIcon onClick={searchChattingList}>
                <Search />
              </StyleSearchIcon> */}
            </StyleSearchArea>
          </FlexBox>
          <Spacing size={30} />
          <StyleChattingItem>
            {filteredChattingList.length !== 0 ? (
              filteredChattingList?.map((chat) => (
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
                    rightElement={
                      <div style={{ color: 'red' }}>
                        {!chat.seen && chat.receiver._id === userData._id ? 'new' : ''}
                      </div>
                    }
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
              <StyleNoData>{'채팅이 존재하지 않습니다!'}</StyleNoData>
            )}
          </StyleChattingItem>
        </StyleChattingListWrapper>
      )}
    </StyleWrapper>
  )
}
const StyleChattingListWrapper = styled.div`
  width: 100%;
  height: 100%;
`
const StyleListRow = styled(FlexBox)`
  cursor: pointer;
  margin: 10px 0px;
`
const Stylehr = styled.hr`
  border: 1px solid ${palette.GRAY400};
  width: 100%;
`
const StyleSearchArea = styled(FlexBox)`
  text-align: center;
  height: 100%;
  padding: 0px 20px;
`
const StyleChattingItem = styled.li`
  padding: 0px 20px;
  list-style: none;
  max-height: calc(100% - 100px);
  overflow-y: auto;
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
