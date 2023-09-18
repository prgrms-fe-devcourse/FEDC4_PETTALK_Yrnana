/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@/libs/apis/auth/authType'
import { Channel } from '@/libs/apis/channel/channelType'

export type Post = {
  likes: Like[]
  comments: Comment[]
  _id: string
  image: any
  imagePublicId?: string
  title: string
  channel: Channel
  author: User
  createdAt: string
  updatedAt: string
}

export type Like = {
  _id: string
  user: string
  post: string
  createdAt: string
  updatedAt: string
}

export type Comment = {
  _id: string
  comment: string
  author: User
  post: string //post Id
  createdAt: string
  updatedAt: string
}
