import { User } from '@/libs/apis/auth/authType'
export type Message = {
  _id: string
  message: string
  sender: User
  receiver: User
  seen: boolean
  createdAt: string
  updatedAt: string
}
