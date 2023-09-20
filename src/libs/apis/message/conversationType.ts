import { User } from '@/libs/apis/auth/authType'
export type Conversation = {
  _id: string[]
  message: string
  sender: User
  receiver: User
  seen: boolean
  createdAt: string
}
