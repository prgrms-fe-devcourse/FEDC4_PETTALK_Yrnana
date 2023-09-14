import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import Loading from '@/components/common/loading'
import { ChannelApi } from '@/libs/apis/channel/ChannelApi'

const MainPage = () => {
  const { data, isLoading } = useQuery(['channels'], () => ChannelApi.GET_CHANNEL())
  const navigate = useNavigate()

  //TODO: 로딩 컴포넌트 추가 시 리팩토링 가능성 있음
  if (isLoading)
    return (
      <>
        <Loading />
      </>
    )
  return (
    <>
      {data?.map((channel, index) => (
        <li key={index} onClick={() => navigate(`/posts/${channel._id}`)}>
          {channel.name}
        </li>
      ))}
    </>
  )
}
export default MainPage
