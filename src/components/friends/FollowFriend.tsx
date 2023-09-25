import { useMutation } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router-dom'

import Send from '@/assets/icons/Send'
import Button from '@/components/common/button'
import { FlexBox } from '@/components/common/flexBox'
import ListRow from '@/components/common/listRow'
import Spacing from '@/components/common/spacing'
import { FriendListResponse } from '@/libs/apis/auth/authType'
import { Follow } from '@/libs/apis/auth/authType'
import { queryClient } from '@/libs/apis/queryClient'
import { UserApi } from '@/libs/apis/user/userApi'
import useModal from '@/libs/hooks/useModal'
import { userAtom } from '@/libs/store/userAtom'

interface FollowFriendProps {
  data: FriendListResponse
  follow: boolean
  handleFollow?: (id: string) => void
}

const FollowFriend = ({ data, follow }: FollowFriendProps) => {
  const { openModal } = useModal()
  const navigate = useNavigate()
  const [user, setUser] = useAtom(userAtom)
  const followMutation = useMutation(UserApi.FOLLOW_USER, {
    onSettled: () => {
      queryClient.invalidateQueries(['userList'])
    },
    onSuccess: (follow: Follow) => {
      openModal({ content: '팔로우 신청 성공!', type: 'success' })
      setUser({ ...user, following: [...user.following, follow] })
    },
  })

  const unfollowMutation = useMutation(UserApi.UNFOLLOW_USER, {
    onSettled: () => {
      queryClient.invalidateQueries(['userList'])
    },
    onSuccess: (follow: Follow) => {
      const filtered = user.following.filter((data) => data._id !== follow._id)
      openModal({ content: '언팔로우 완료!', type: 'success' })
      setUser({ ...user, following: [...filtered] })
    },
  })

  const handleFollow = (userId: string) => {
    followMutation.mutate(userId)
  }

  const handleUnFollow = (followerList: string[]) => {
    const myfollowingList = user.following.map((data) => data._id)
    const followId = myfollowingList.filter((data) => followerList.includes(data))
    if (followId.length === 0) return
    else {
      unfollowMutation.mutate(followId[0])
    }
  }
  return (
    <FlexBox direction={'column'} fullWidth={true} align={'center'} gap={10}>
      <ListRow
        leftImage={data.image}
        mainText={data.fullName}
        rightElement={
          follow ? (
            <FlexBox direction={'row'} align={'center'} gap={20}>
              <Send
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  navigate('/chatting', {
                    state: {
                      sender: user,
                      receiver: data,
                    },
                  })
                }
              />
              <Button
                buttonType={'Medium'}
                backgroundColor={'MINT'}
                value={'팔로잉'}
                onClick={() => handleUnFollow(data.followers)}
              />
            </FlexBox>
          ) : (
            <Button
              buttonType={'Medium'}
              backgroundColor={'BEIGE'}
              value={'팔로우'}
              onClick={() => handleFollow(data._id)}
            />
          )
        }
      />
      <Spacing size={1} color={'GRAY400'} />
    </FlexBox>
  )
}

export default FollowFriend
