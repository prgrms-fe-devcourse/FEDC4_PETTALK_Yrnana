import styled from '@emotion/styled'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAtom, useAtomValue } from 'jotai'
import { MouseEvent, useEffect, useRef, useState } from 'react'

import Button from '@/components/common/button'
import ChattingBubble from '@/components/common/chattingBubble'
import { FlexBox } from '@/components/common/flexBox'
import ListRow from '@/components/common/listRow'
import Loading from '@/components/common/loading'
import ProfileImage from '@/components/common/profileImage'
import Spacing from '@/components/common/spacing'
import TextArea from '@/components/common/textarea'
import MessageApi from '@/libs/apis/message/messageApi'
import { Message } from '@/libs/apis/message/messageType'
import { userAtom } from '@/libs/store/userAtom'
import Datetime from '@/pages/chatting/datetime'
import { theme } from '@/styles/theme'

import { messageMock } from '../../mock/message'

interface FormattedMessage extends Message {
  formattedDate: string
  formattedTime: string
}

const Chatting = () => {
  const userData = useAtomValue(userAtom)

  const messageRef = useRef<HTMLTextAreaElement>(null)

  const [testUserId, setTestUserId] = useState<string>('')

  useEffect(() => {
    setTestUserId(
      userData._id === '65029272aa40045f5cff7ae9'
        ? '6509302b2b2dc04dc8b34182'
        : '65029272aa40045f5cff7ae9',
    )
  }, [userData])

  const getDetailMessages = async (userId: string) => {
    if (!userId) return

    const response = await MessageApi.GET_DETAIL_MESSAGES(userId)
    return response
  }

  const { data, error, isLoading, refetch } = useQuery(
    ['messages'],
    () => getDetailMessages(testUserId),
    {
      enabled: testUserId !== userData._id, // testUserId가 존재할 때만 호출
      refetchInterval: 5000,
      refetchIntervalInBackground: true,
      retry: 3,
    },
  )
  console.log(data)

  const mutation = useMutation(MessageApi.SEND_MESSAGE, {
    onSuccess: () => {
      console.log('메시지 전송 성공!')

      if (messageRef.current) messageRef.current.value = ''
    },
    onError: (error) => {
      console.error('메시지 전송 중 오류 발생:', error)
    },
  })

  const sendMessage = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (!messageRef.current || !messageRef.current.value) {
      console.log('메시지를 입력하세요.')
      return
    }

    try {
      await mutation.mutateAsync({
        message: messageRef.current.value,
        receiver: testUserId,
      })
    } catch (error) {
      console.error('메시지 전송 중 오류 발생:', error)
    }
  }

  // ----  데이터 포맷팅 ------

  // utc 시간, 날짜 포맷팅
  const parsedMessages: FormattedMessage[] = data
    ? data.map((message) => {
        const parsedDate = new Date(message.createdAt)
        const formattedDate = `${parsedDate.getFullYear()}년 ${
          parsedDate.getMonth() + 1
        }월 ${parsedDate.getDate()}일`
        const formattedTime = `${String(parsedDate.getHours()).padStart(2, '0')}:${String(
          parsedDate.getMinutes(),
        ).padStart(2, '0')}`

        return { ...message, formattedDate, formattedTime }
      })
    : []

  // 날짜 기준 메시지 그룹화
  const groupedMessages: Record<string, FormattedMessage[]> = {}
  parsedMessages.forEach((message) => {
    const date = message.formattedDate
    if (!groupedMessages[date]) groupedMessages[date] = []
    groupedMessages[date].push(message)
  })

  // 객체 -> 배열
  const entries = Object.entries(groupedMessages)

  const messageWrapperRef = useRef<HTMLDivElement>(null)
  const [isInitialRender, setIsInitialRender] = useState(true)

  useEffect(() => {
    // 최초 렌더링 시에만 스크롤을 가장 아래로 이동
    if (isInitialRender && data && messageWrapperRef.current) {
      messageWrapperRef.current.scrollTop = messageWrapperRef.current.scrollHeight
      setIsInitialRender(false) // 최초 렌더링 이후로는 더 이상 실행하지 않음
    }
  }, [data, isInitialRender]) // data 또는 isInitialRender가 업데이트될 때마다 실행

  // ... (기존 코드)

  return (
    <ChattingWrapper direction={'column'} fullWidth={true} align={'stretch'}>
      <MessageWrapper ref={messageWrapperRef}>
        {isLoading ? (
          <Loading></Loading>
        ) : (
          data &&
          entries.map(([date, messages]) => (
            <FlexBox direction={'column'} gap={20} key={date}>
              <Datetime content={date}></Datetime>
              {messages.map((message) =>
                userData._id === message.sender._id ? (
                  <ChattingBubble
                    key={message._id}
                    isMyChat={true}
                    message={message.message}
                    time={message.formattedTime}
                  />
                ) : (
                  <ListRow
                    key={message._id}
                    leftImage={message.sender.image}
                    mainText={message.sender.fullName}
                    subElement={
                      <ChattingBubble message={message.message} time={message.formattedTime} />
                    }
                    rightElement={null}
                  />
                ),
              )}
              <Spacing size={20}></Spacing>
            </FlexBox>
          ))
        )}
      </MessageWrapper>
      <TypingFlexBox gap={10}>
        <TextArea ref={messageRef} height={20} />
        <Button
          buttonType={'Medium'}
          value={'작성하기'}
          backgroundColor={'MAINYELLOW'}
          onClick={sendMessage}
        ></Button>
      </TypingFlexBox>
    </ChattingWrapper>
  )
}

const ChattingWrapper = styled(FlexBox)`
  padding: 15px;
  padding-bottom: 0px;
  height: 100%;
  overflow-y: auto;
  background-color: ${theme.palette.GRAY100};
`

const MessageWrapper = styled.div`
  max-height: calc(100% - 70px);
  flex: 1;
  overflow-y: auto;
`

const TypingFlexBox = styled(FlexBox)`
  padding: 10px;
  border-radius: 10px;
`

export default Chatting
