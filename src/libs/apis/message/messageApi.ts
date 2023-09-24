import { AxiosRequestConfig } from 'axios'

import { axiosAPI } from '@/libs/apis/axios'
import { Conversation } from '@/libs/apis/message/conversationType'
import { Message } from '@/libs/apis/message/messageType'

type MessageType = {
  message: string
  receiver: string
}

const MessageApi = {
  GET_MESSAGES: async (): Promise<Conversation[]> => {
    const response = await axiosAPI.get('/messages/conversations')
    return response.data
  },
  GET_DETAIL_MESSAGES: async (userId: string): Promise<Message[]> => {
    const config: AxiosRequestConfig = {
      params: {
        userId: userId,
      },
    }
    const response = await axiosAPI.get('/messages', config)
    return response.data
  },
  SEND_MESSAGE: async (payload: MessageType): Promise<Message> => {
    const response = await axiosAPI.post('/messages/create', payload)
    return response.data
  },
  READ_MESSAGE: async (sender: string): Promise<Message> => {
    const response = await axiosAPI.put('/messages/update-seen', { sender })
    return response.data
  },
}

export default MessageApi
