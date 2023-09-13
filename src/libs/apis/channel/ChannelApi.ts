import { axiosAPI } from '@/libs/apis/axios'
import { Channel, ChannelCreateRequest } from '@/libs/apis/channel/channelType'
export const ChannelApi = {
  CREATE_CHANNEL: async (payload: ChannelCreateRequest) => {
    const response = await axiosAPI.post('/channels/create', payload)
    return response.data
  },
  GET_CHANNEL: async (): Promise<Channel[]> => {
    const response = await axiosAPI.get('/channels')
    return response.data
  },
}
