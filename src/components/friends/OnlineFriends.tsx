import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'

import { FlexBox } from '@/components/common/flexBox'
import ProfileImage from '@/components/common/profileImage'
import { Text } from '@/components/common/text'
import { UserApi } from '@/libs/apis/user/userApi'

const OnlineFriends = () => {
  const { data } = useQuery(['userList'], () => UserApi.GET_USERS())
  //const { onlineUser } = useQuery(['online'], () => UserApi.GET_ONLINE_USERS())
  return (
    <FlexBox direction={'column'} align={'flex-start'} fullWidth={true} gap={20}>
      <Text typo={'SubHead_18'}>{'활동 중인 친구'}</Text>
      <FlexBox direction={'row'} align={'center'} gap={20}>
        {data?.length === 0 ? (
          <Text typo={'Body_16'}>{'활동중인 유저가 없습니다.'}</Text>
        ) : (
          data?.map((data, index) => {
            return <ProfileImage key={index} size={70} updatable={false} image={data.image} />
          })
        )}
      </FlexBox>
    </FlexBox>
  )
}

export default OnlineFriends

const OnlineFriendsProfileWrapper = styled.div`
  width: 100%;
`
