import styled from '@emotion/styled'

import CubeButton from '@/components/common/cubeButton'
import { FlexBox } from '@/components/common/flexBox'
import { Channel } from '@/libs/apis/channel/channelType'

import { channelMock } from '../../../mock/channel'

type ChannelListProps = {
  data: Channel[]
}

const ChannelList = ({ data }: ChannelListProps) => {
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
