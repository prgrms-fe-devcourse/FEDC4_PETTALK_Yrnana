import styled from '@emotion/styled'
import { useMutation, useQuery } from '@tanstack/react-query'
import { MouseEvent, useRef } from 'react'

import Button from '@/components/common/button'
import ChattingBubble from '@/components/common/chattingBubble'
import { FlexBox } from '@/components/common/flexBox'
import ListRow from '@/components/common/listRow'
import ProfileImage from '@/components/common/profileImage'
import Spacing from '@/components/common/spacing'
import TextArea from '@/components/common/textarea'
import MessageApi from '@/libs/apis/message/messageApi'
import { Message } from '@/libs/apis/message/messageType'
import Datetime from '@/pages/chatting/datetime'
import { theme } from '@/styles/theme'

import { messageMock } from '../../mock/message'

interface FormattedMessage extends Message {
  formattedDate: string
}

const Chatting = () => {
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const getMessages = async () => {
    // GET_MESSAGES API 호출 및 데이터 반환
    const response = await MessageApi.GET_MESSAGES()
    return response
  }

  const { data, error, isLoading } = useQuery(['messages'], getMessages)

  console.log(data)

  const mutation = useMutation(MessageApi.SEND_MESSAGE, {
    onSuccess: () => {
      console.log('메시지 전송 성공!')
      if (messageRef.current) {
        messageRef.current.value = ''
      }
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

    const messageContent = messageRef.current.value
    const userId = 'testId'

    try {
      const formData = new FormData()
      formData.append('message', messageContent)
      formData.append('receiver', userId)

      await mutation.mutateAsync({ message: messageContent, receiver: '6503f59754033e25ea4a4600' })
    } catch (error) {
      console.error('메시지 전송 중 오류 발생:', error)
    }
  }

  // ----

  const parsedMessages: FormattedMessage[] = messageMock.map((message) => {
    const parsedDate = new Date(message.createdAt)
    const formattedDate = `${parsedDate.getFullYear()}년 ${
      parsedDate.getMonth() + 1
    }월 ${parsedDate.getDate()}일`
    return { ...message, formattedDate }
  })

  const groupedMessages: Record<string, FormattedMessage[]> = {}
  parsedMessages.forEach((message) => {
    const date = message.formattedDate
    if (!groupedMessages[date]) {
      groupedMessages[date] = []
    }
    groupedMessages[date].push(message)
  })

  // 결과 출력
  // console.log('일자별 그룹화된 메시지:', groupedMessages)

  for (const [key, value] of Object.entries(groupedMessages)) {
    // console.log('Date:', key)
    // console.log('Messages:', value)
  }

  const entries = Object.entries(groupedMessages)

  return (
    <ChattingWrapper direction={'column'} fullWidth={true} align={'stretch'}>
      <MessageWrapper>
        {entries.map(([date, messages]) => (
          <FlexBox direction={'column'} gap={20} key={date}>
            <Datetime content={date}></Datetime>
            {messages.map((message) =>
              'id2' === message.sender._id ? (
                <ChattingBubble
                  key={message._id}
                  isMyChat={true}
                  message={message.message}
                  time={'17:45'}
                />
              ) : (
                <ListRow
                  key={message._id}
                  leftImage={
                    <ProfileImage size={35} image={message.sender.image} updatable={false} />
                  }
                  mainText={message.sender.fullName}
                  subElement={<ChattingBubble message={message.message} time={'17:44'} />}
                  rightElement={null}
                />
              ),
            )}
            <Spacing size={20}></Spacing>
          </FlexBox>
        ))}
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

  display: flex;
  flex-direction: column; /* Children will be stacked vertically */
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
