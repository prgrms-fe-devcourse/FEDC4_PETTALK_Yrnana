import { useQuery } from '@tanstack/react-query'

import Button from '@/components/common/button'
import { FlexBox } from '@/components/common/flexBox'
import ListRow from '@/components/common/listRow'
import Spacing from '@/components/common/spacing'
import { User } from '@/libs/apis/auth/authType'
import { UserApi } from '@/libs/apis/user/userApi'

interface FollowFriendProps {
  data: User
}

const FollowFriend = ({ data }: FollowFriendProps) => {
  return (
    <FlexBox direction={'column'} fullWidth={true} align={'center'} gap={10}>
      <ListRow
        leftImage={data.image}
        mainText={data.fullName}
        rightElement={<Button buttonType={'Medium'} color={'pink'} value={'팔로우'}></Button>}
      />
      <Spacing size={1} color={'GRAY400'} />
    </FlexBox>
  )
}

export default FollowFriend
