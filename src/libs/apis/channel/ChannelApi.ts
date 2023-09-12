import { axiosAPI } from '@/libs/apis/axios'
import { ChannelCreateRequest } from '@/libs/apis/channel/channelType'
export const ChannelApi = {
  CREATE_CHANNEL: async (payload: ChannelCreateRequest) => {
    const response = await axiosAPI.post('/channels/create', payload)
    return response.data
  },
}
