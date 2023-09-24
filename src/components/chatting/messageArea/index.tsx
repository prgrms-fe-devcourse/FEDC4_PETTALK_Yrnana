import { useAtomValue } from 'jotai'

import Datetime from '@/components/chatting/datetime'
import ChattingBubble from '@/components/common/chattingBubble'
import { FlexBox } from '@/components/common/flexBox'
import ListRow from '@/components/common/listRow'
import Spacing from '@/components/common/spacing'
import { Message } from '@/libs/apis/message/messageType'
import { userAtom } from '@/libs/store/userAtom'

interface FormattedMessage extends Message {
  formattedDate: string
  formattedTime: string
}

type MessageAreaProps = {
  data: Message[]
}

const MessageArea = ({ data }: MessageAreaProps) => {
  const userData = useAtomValue(userAtom)

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

  const groupedMessages: Record<string, FormattedMessage[]> = {}
  parsedMessages.forEach((message: FormattedMessage) => {
    const date = message.formattedDate
    if (!groupedMessages[date]) groupedMessages[date] = []
    groupedMessages[date].push(message)
  })
  const entries = Object.entries(groupedMessages)

  return entries.map(([date, messages]) => (
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
            subElement={<ChattingBubble message={message.message} time={message.formattedTime} />}
            rightElement={null}
          />
        ),
      )}
      <Spacing size={20}></Spacing>
    </FlexBox>
  ))
}

export default MessageArea
