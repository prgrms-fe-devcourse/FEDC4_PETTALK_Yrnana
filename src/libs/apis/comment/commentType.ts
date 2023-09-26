import { User } from '@/libs/apis/auth/authType'

export type CommentType = {
  _id: string
  comment: string
  author: User
  post: string // 포스트 id
  createdAt: string
  updatedAt: string
}
