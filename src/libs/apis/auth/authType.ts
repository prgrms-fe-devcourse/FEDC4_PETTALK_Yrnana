import { Message } from '@/libs/apis/message/messageType'
import { Post } from '@/libs/apis/post/postType'
import { Like } from '@/libs/apis/post/postType'
export type User = {
  coverImage: string // 커버 이미지
  image: string // 프로필 이미지
  role: string
  isOnline: boolean
  posts: Post[]
  likes: Like[]
  comments: string[]
  followers: []
  following: []
  notifications: Notification[]
  messages: Message[]
  _id: string
  fullName: string
  email: string
  createdAt: string
  updatedAt: string
}
