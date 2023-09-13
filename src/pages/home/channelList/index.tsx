import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'

import CubeButton from '@/components/common/cubeButton'
import { FlexBox } from '@/components/common/flexBox'
import Spacing from '@/components/common/spacing'
import { ChannelApi } from '@/libs/apis/channel/ChannelApi'

import { channelMock } from '../../../mock/channel'

const ChannelList = () => {
  const { data, isLoading } = useQuery(['channels'], () => ChannelApi.GET_CHANNEL())

  console.log(data)
  if (isLoading) return <h2>{'로딩 중...'}</h2>

  return (
    <ChannelWrapper>
      {data &&
        data.map((channel) => {
          return (
            <FlexBox key={channel._id}>
              <CubeButton content={channel.name} path={`/post/${channel._id}`}></CubeButton>
            </FlexBox>
          )
        })}
    </ChannelWrapper>
  )
}

const ChannelWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
`

export default ChannelList
