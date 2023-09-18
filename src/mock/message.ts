import { Message } from '@/libs/apis/message/messageType'

import { userMock, userMock2 } from '../mock/user'

export const messageMock: Message[] = [
  // 내 대화
  {
    _id: '1',
    message: '안녕하세요!',
    sender: userMock2,
    receiver: userMock,
    seen: false,
    createdAt: '2021-10-15T20:48:19.816Z',
    updatedAt: '2021-10-15T20:48:19.816Z',
  },
  // 상대방 대화
  {
    _id: '2',
    message: '넵 안녕하세요~!!',
    sender: userMock,
    receiver: userMock2,
    seen: false,
    createdAt: '2021-10-15T20:49:39.816Z',
    updatedAt: '2021-10-15T20:48:19.816Z',
  },
  // 내 대화
  {
    _id: '3',
    message: '안녕하세요!',
    sender: userMock2,
    receiver: userMock,
    seen: false,
    createdAt: '2021-10-15T22:48:19.816Z',
    updatedAt: '2021-10-15T22:48:19.816Z',
  },
  // 상대방 대화
  {
    _id: '4',
    message: '넵 안녕하세요~!!',
    sender: userMock,
    receiver: userMock2,
    seen: false,
    createdAt: '2021-10-15T22:49:39.816Z',
    updatedAt: '2021-10-15T22:48:19.816Z',
  },
  //   // 내 대화
  //   {
  //     _id: '5',
  //     message: '안녕하세요!',
  //     sender: userMock2,
  //     receiver: userMock,
  //     seen: false,
  //     createdAt: '2021-10-16T20:48:19.816Z',
  //     updatedAt: '2021-10-16T20:48:19.816Z',
  //   },
  //   // 상대방 대화
  //   {
  //     _id: '6',
  //     message: '넵 안녕하세요~!!',
  //     sender: userMock,
  //     receiver: userMock2,
  //     seen: false,
  //     createdAt: '2021-10-16T20:49:39.816Z',
  //     updatedAt: '2021-10-16T20:48:19.816Z',
  //   },
  //   // 내 대화
  //   {
  //     _id: '1',
  //     message: '안녕하세요!',
  //     sender: userMock2,
  //     receiver: userMock,
  //     seen: false,
  //     createdAt: '2021-10-15T20:48:19.816Z',
  //     updatedAt: '2021-10-15T20:48:19.816Z',
  //   },
  //   // 상대방 대화
  //   {
  //     _id: '2',
  //     message: '넵 안녕하세요~!!',
  //     sender: userMock,
  //     receiver: userMock2,
  //     seen: false,
  //     createdAt: '2021-10-15T20:49:39.816Z',
  //     updatedAt: '2021-10-15T20:48:19.816Z',
  //   },
  //   // 내 대화
  //   {
  //     _id: '3',
  //     message: '안녕하세요!',
  //     sender: userMock2,
  //     receiver: userMock,
  //     seen: false,
  //     createdAt: '2021-10-15T22:48:19.816Z',
  //     updatedAt: '2021-10-15T22:48:19.816Z',
  //   },
  //   // 상대방 대화
  //   {
  //     _id: '4',
  //     message: '넵 안녕하세요~!!',
  //     sender: userMock,
  //     receiver: userMock2,
  //     seen: false,
  //     createdAt: '2021-10-15T22:49:39.816Z',
  //     updatedAt: '2021-10-15T22:48:19.816Z',
  //   },
  //   // 내 대화
  //   {
  //     _id: '5',
  //     message: '안녕하세요!',
  //     sender: userMock2,
  //     receiver: userMock,
  //     seen: false,
  //     createdAt: '2021-10-16T20:48:19.816Z',
  //     updatedAt: '2021-10-16T20:48:19.816Z',
  //   },
  //   // 상대방 대화
  //   {
  //     _id: '6',
  //     message: '넵 안녕하세요~!!',
  //     sender: userMock,
  //     receiver: userMock2,
  //     seen: false,
  //     createdAt: '2021-10-16T20:49:39.816Z',
  //     updatedAt: '2021-10-16T20:48:19.816Z',
  //   },
]
