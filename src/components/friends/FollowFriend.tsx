import Send from '@/assets/icons/Send'
import Button from '@/components/common/button'
import { FlexBox } from '@/components/common/flexBox'
import ListRow from '@/components/common/listRow'
import Spacing from '@/components/common/spacing'
import { User } from '@/libs/apis/auth/authType'
interface FollowFriendProps {
  data: User
  follow: boolean
}

const FollowFriend = ({ data, follow }: FollowFriendProps) => {
  return (
    <FlexBox direction={'column'} fullWidth={true} align={'center'} gap={10}>
      <ListRow
        leftImage={data.image}
        mainText={data.fullName}
        rightElement={
          follow ? (
            <FlexBox direction={'row'} align={'center'} gap={20}>
              <Send />
              <Button
                buttonType={'Medium'}
                backgroundColor={'MINT'}
                value={'팔로잉'}
                onClick={() => handleFollow(follow)}
              />
            </FlexBox>
          ) : (
            <Button buttonType={'Medium'} backgroundColor={'BEIGE'} value={'팔로우'}></Button>
          )
        }
      />
      <Spacing size={1} color={'GRAY400'} />
    </FlexBox>
  )
}

export default FollowFriend
