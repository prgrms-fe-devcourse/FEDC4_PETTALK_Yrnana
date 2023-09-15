import { userMock, userMock2 } from 'src/mock/user'

import { Message } from '@/libs/apis/message/messageType'

export const messageMock: Message[] = [
  {
    _id: 'id2',
    message: '안녕하세요!',
    sender: userMock2,
    receiver: userMock,
    seen: false,
    createdAt: '2023-04-05',
    updatedAt: '2023-05-28',
  },
  {
    _id: 'id2',
    message: '넵 안녕하세요~!!',
    sender: userMock,
    receiver: userMock2,
    seen: false,
    createdAt: '2023-04-05',
    updatedAt: '2023-05-28',
  },
]
