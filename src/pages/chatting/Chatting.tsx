import ChattingBubble from '@/components/common/chattingBubble'
import { FlexBox } from '@/components/common/flexBox'
import ListRow from '@/components/common/listRow'
import ProfileImage from '@/components/common/profileImage'
import Spacing from '@/components/common/spacing'
import { Message } from '@/libs/apis/message/messageType'
import Datetime from '@/pages/chatting/datetime'

import { messageMock } from '../../mock/message'

interface FormattedMessage extends Message {
  formattedDate: string
}

const Chatting = () => {
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
  console.log('일자별 그룹화된 메시지:')
  console.log(groupedMessages)
  for (const [key, value] of Object.entries(groupedMessages)) {
    console.log('Date:', key)
    console.log('Messages:', value)
  }

  const entries = Object.entries(groupedMessages)

  return (
    <>
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
    </>
  )
}

export default Chatting
