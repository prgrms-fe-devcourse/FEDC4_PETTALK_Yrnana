import styled from '@emotion/styled'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import MessageArea from '@/components/chatting/messageArea'
import Button from '@/components/common/button'
import { FlexBox } from '@/components/common/flexBox'
import Loading from '@/components/common/loading'
import TextArea from '@/components/common/textarea'
import { User } from '@/libs/apis/auth/authType'
import MessageApi from '@/libs/apis/message/messageApi'
import { Message } from '@/libs/apis/message/messageType'
import { userAtom } from '@/libs/store/userAtom'
import { theme } from '@/styles/theme'

const Chatting = () => {
  const userData = useAtomValue(userAtom)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const [opponent, setOpponent] = useState<string>('')
  const { sender, receiver } = (useLocation().state || {}) as { sender: User; receiver: User }
  const messageWrapperRef = useRef<HTMLDivElement>(null)
  const [isInitialRender, setIsInitialRender] = useState(true)
  const [messageData, setMessageData] = useState<Message[] | []>([])

  const getDetailMessages = async (userId: string) => {
    try {
      if (!userId) return []
      const response = await MessageApi.GET_DETAIL_MESSAGES(userId)
      return response
    } catch (error) {
      console.error('Error fetching messages:', error)
      throw error
    }
  }

  const { data, isLoading } = useQuery(['messages', opponent], () => getDetailMessages(opponent), {
    enabled: opponent !== userData._id,
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
    retry: 3,
    onSuccess: async (responseData: Message[]) => {
      setMessageData(responseData)

      if (responseData.length > 0) {
        const senderUser = responseData[responseData.length - 1]!.sender as User
        await MessageApi.READ_MESSAGE(senderUser._id)
      }
    },
  })

  const mutation = useMutation(MessageApi.SEND_MESSAGE, {
    onSuccess: () => {
      if (messageRef.current) messageRef.current.value = ''
    },
    onError: (error) => {
      console.error('메시지 전송 중 오류 발생:', error)
    },
  })

  const sendMessage = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!messageRef.current || !messageRef.current.value) return

    try {
      await mutation.mutateAsync({
        message: messageRef.current.value,
        receiver: opponent,
      })
    } catch (error) {
      console.error('메시지 전송 중 오류 발생:', error)
    }
  }

  useEffect(() => {
    setOpponent(sender._id === userData._id ? receiver._id : sender._id)
  }, [userData])

  useEffect(() => {
    // 최초 렌더링 시에만 스크롤을 가장 아래로 이동
    if (isInitialRender && messageData.length > 0 && messageWrapperRef.current) {
      messageWrapperRef.current.scrollTop = messageWrapperRef.current.scrollHeight
      setIsInitialRender(false)
    }
  }, [isInitialRender, messageData])

  return (
    <ChattingWrapper direction={'column'} fullWidth={true} align={'stretch'}>
      <MessageWrapper ref={messageWrapperRef}>
        {isLoading ? <Loading></Loading> : data && <MessageArea data={data} />}
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
  scroll-behavior: smooth;
`

const TypingFlexBox = styled(FlexBox)`
  padding: 10px;
  border-radius: 10px;
`

export default Chatting
