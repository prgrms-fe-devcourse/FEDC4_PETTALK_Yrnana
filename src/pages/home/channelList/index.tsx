import styled from '@emotion/styled'

import CubeButton from '@/components/common/cubeButton'
import { FlexBox } from '@/components/common/flexBox'
import Spacing from '@/components/common/spacing'

import { channelMock } from '../../../mock/channel'

const ChannelList = () => {
  return (
    <ChannelWrapper>
      {channelMock &&
        channelMock.map((channel, index) => {
          if (index % 2 === 0) {
            const nextChannel = channelMock[index + 1]

            return (
              <div key={channel._id}>
                <FlexBox gap={13}>
                  <CubeButton content={channel.name} path={`/${channel._id}`}></CubeButton>
                  {nextChannel && (
                    <CubeButton
                      content={nextChannel.name}
                      path={`/${nextChannel._id}`}
                    ></CubeButton>
                  )}
                </FlexBox>
                <Spacing size={13}></Spacing>
              </div>
            )
          }

          return null
        })}
    </ChannelWrapper>
  )
}

const ChannelWrapper = styled.div``

export default ChannelList
