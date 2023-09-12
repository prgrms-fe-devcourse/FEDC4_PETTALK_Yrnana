import { Channel } from '@/libs/apis/channel/channelType'
type ChannelsMock = Channel[]

export const channelMock: ChannelsMock = [
  {
    posts: ['post1', 'post2', 'cc', 'dd'],
    _id: 'abc1',
    name: '테스트용채널1',
    description: '채널설명 채널설명',
    createdAt: '2023-04-05',
    updatedAt: '2023-05-04',
  },
  {
    posts: ['aa', 'bb', 'cc', 'dd'],
    _id: 'abc2',
    name: '테스트용채널2',
    description: '채널설명 채널설명',
    createdAt: '2023-04-05',
    updatedAt: '2023-05-04',
  },
  {
    posts: ['aa', 'bb', 'cc', 'dd'],
    _id: 'abc3',
    name: '테스트용채널3',
    description: '채널설명 채널설명',
    createdAt: '2023-04-05',
    updatedAt: '2023-05-04',
  },
  {
    posts: ['aa', 'bb', 'cc', 'dd'],
    _id: 'abc4',
    name: '테스트용채널4',
    description: '채널설명 채널설명',
    createdAt: '2023-04-05',
    updatedAt: '2023-05-04',
  },
]
