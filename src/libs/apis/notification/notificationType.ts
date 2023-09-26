import { User } from '@/libs/apis/auth/authType'
import { Comment } from '@/libs/apis/post/postType'
export type Notification = {
  seen: boolean
  _id: string
  author: User
  user: User
  post?: string | null // 포스트 id
  follow?: string // 사용자 id
  comment?: Comment
  message?: string // 메시지 id
  createdAt: string
  updatedAt: string
}
