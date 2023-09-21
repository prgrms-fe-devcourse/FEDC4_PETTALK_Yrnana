import { User } from '@/libs/apis/auth/authType'

export const userMock: User = {
  coverImage: 'https://picsum.photos/200/300',
  image: 'https://picsum.photos/200/300',
  role: 'user',
  isOnline: true,
  posts: [],
  likes: [],
  comments: [],
  followers: [],
  following: [],
  notifications: [],
  messages: [],
  _id: 'id1',
  fullName: '유진찡',
  email: 'gene028@naver.com',
  createdAt: '2023-04-05',
  updatedAt: '2023-05-28',
}

export const userMock2: User = {
  coverImage: 'https://picsum.photos/210/300',
  image: 'https://picsum.photos/210/300',
  role: 'user',
  isOnline: true,
  posts: [],
  likes: [],
  comments: [],
  followers: [],
  following: [],
  notifications: [],
  messages: [],
  _id: 'id2',
  fullName: '정호찡',
  email: 'cloud0406@naver.com',
  createdAt: '2023-04-06',
  updatedAt: '2023-06-29',
}
