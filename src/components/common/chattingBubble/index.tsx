import styled from '@emotion/styled'
import { ComponentProps } from 'react'

import { Text } from '@/components/common/text'
import { palette } from '@/styles/palette'
import { type KeyOfPalette, type KeyOfTypo } from '@/styles/theme'

interface ChattingBubbleProps extends ComponentProps<'div'> {
  isMyChat?: boolean
  message: string
  time: string
  messageTypo?: KeyOfTypo
  messageColor?: KeyOfPalette
  timeTypo?: KeyOfTypo
  timeColor?: KeyOfPalette
  color?: KeyOfPalette
}

/**
 * @param isMychat : 내 채팅인지, 상대방의 채팅인지 여부 / 기본 : false
 * @param message : 메시지 내용
 * @param time : 메시지 작성 시간
 * @param messageType : message에 적용할 typo
 * @param messageColor: message에 적용시킬 color
 * @param timeType : time에 적용할 typo
 * @param timeColor : time에 적용할 color
 */

const ChattingBubble = ({
  isMyChat = false,
  message,
  time,
  messageTypo = 'SubHead_12',
  messageColor = 'BLACK',
  timeTypo = 'Caption_11',
  timeColor = 'GRAY500',
  ...props
}: ChattingBubbleProps) => {
  return (
    <BubbleContainer isMyChat={isMyChat} {...props}>
      <StyledText isMyChat={isMyChat}>
        <MessageText typo={messageTypo} color={messageColor} {...props}>
          {message}
        </MessageText>
      </StyledText>
      <TimeText typo={timeTypo} color={timeColor} {...props}>
        {time}
      </TimeText>
    </BubbleContainer>
  )
}

const BubbleContainer = styled.div<{ isMyChat: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.isMyChat && 'flex-end'};
  gap: 10px;
`

const StyledText = styled.div<{
  isMyChat: boolean
}>`
  border-radius: 10px;
  background-color: ${palette.WHITE};
  padding: 7px 12px;
  word-wrap: break-word;
  order: ${(props) => (props.isMyChat ? '2' : '1')};
`

const TimeText = styled(Text)`
  order: 1;
  line-height: 150%;
`

const MessageText = styled(Text)`
  line-height: 150%;
`

export default ChattingBubble
