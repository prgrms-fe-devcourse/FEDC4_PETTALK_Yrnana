import { userMock } from 'src/mock/user'

import { Post } from '@/libs/apis/post/postType'
export const postsMock: Post[] = [
  {
    likes: [
      {
        _id: 'abc',
        user: '김유지',
        post: 'post1',
        createdAt: '2023-2',
        updatedAt: '2023-4',
      },
      {
        _id: 'abc1',
        user: '김유징',
        post: 'post1',
        createdAt: '2023-2',
        updatedAt: '2023-4',
      },
    ],
    comments: [],
    _id: 'post1',
    image: 'https://picsum.photos/200/300',
    imagePublicId: 'image1',
    title: '테스트용 게시글',
    channel: {
      posts: ['post1', 'post2', 'cc', 'dd'],
      _id: 'abc1',
      name: '테스트용채널1',
      description: '채널설명 채널설명',
      createdAt: '2023-04-05',
      updatedAt: '2023-05-04',
    },
    author: userMock,
    createdAt: '2023-03-03',
    updatedAt: '2023-04-04',
  },
  {
    likes: [
      {
        _id: 'abc',
        user: '김유지',
        post: 'post1',
        createdAt: '2023-2',
        updatedAt: '2023-4',
      },
      {
        _id: 'abc1',
        user: '김유징',
        post: 'post1',
        createdAt: '2023-2',
        updatedAt: '2023-4',
      },
    ],
    comments: [],
    _id: 'post2',
    image: 'https://picsum.photos/200/300',
    imagePublicId: 'image2',
    title: '테스트용 게시글2',
    channel: {
      posts: ['post1', 'post2', 'cc', 'dd'],
      _id: 'abc1',
      name: '테스트용채널1',
      description: '채널설명 채널설명',
      createdAt: '2023-04-05',
      updatedAt: '2023-05-04',
    },
    author: userMock,
    createdAt: '2023-03-03',
    updatedAt: '2023-04-04',
  },
]
