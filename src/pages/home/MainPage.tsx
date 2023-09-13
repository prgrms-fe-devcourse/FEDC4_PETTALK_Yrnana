import { useQuery } from '@tanstack/react-query'

import { ChannelApi } from '@/libs/apis/channel/ChannelApi'

const MainPage = () => {
  const { data, isLoading } = useQuery(['channels'], () => ChannelApi.GET_CHANNEL())

  //TODO: 로딩 컴포넌트 추가 시 리팩토링 가능성 있음
  if (isLoading) return <h2>{'Loading중...'}</h2>
  return <>{data?.map((channel, index) => <li key={index}>{channel.name}</li>)}</>
}
export default MainPage
