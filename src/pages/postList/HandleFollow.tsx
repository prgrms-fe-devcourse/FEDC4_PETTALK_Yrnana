import { useMutation } from '@tanstack/react-query'
import { useAtom } from 'jotai'

import Button from '@/components/common/button'
import { FlexBox } from '@/components/common/flexBox'
import ProfileImage from '@/components/common/profileImage'
import { Text } from '@/components/common/Text'
import { Follow } from '@/libs/apis/auth/authType'
import { Post } from '@/libs/apis/post/postType'
import { queryClient } from '@/libs/apis/queryClient'
import { UserApi } from '@/libs/apis/user/userApi'
import { useNotification } from '@/libs/hooks/useNotification'
import { userAtom } from '@/libs/store/userAtom'

interface Props {
  data: Post | undefined
  postId: string
}

const HandleFollow = ({ data, postId }: Props) => {
  const [userData, setUserData] = useAtom(userAtom)
  const followMutation = useMutation(UserApi.FOLLOW_USER, {
    onSettled: () => {
      queryClient.invalidateQueries(['post', postId])
    },
    onSuccess: (follow: Follow) => {
      setUserData({ ...userData, following: [...userData.following, follow] })
      data?.author._id !== userData._id
        ? useNotification({
            postId: postId,
            userId: follow.user,
            type: 'FOLLOW',
            typeId: follow._id,
          })
        : ''
    },
  })

  const unfollowMutation = useMutation(UserApi.UNFOLLOW_USER, {
    onSettled: () => {
      queryClient.invalidateQueries(['post', postId])
    },
    onSuccess: (follow: Follow) => {
      const filtered = userData.following.filter((data) => data._id !== follow._id)
      setUserData({ ...userData, following: [...filtered] })
    },
  })

  const handleFollow = (e: React.MouseEvent<HTMLButtonElement>, userId: string) => {
    e.preventDefault()
    followMutation.mutate(userId)
  }

  const handleUnFollow = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault()
    unfollowMutation.mutate(id)
  }

  return (
    <FlexBox gap={5}>
      <ProfileImage size={50} image={data?.author.image as string} updatable={false} />
      <FlexBox direction={'column'} justify={'space-around'} align={'center'} gap={5}>
        <Text typo={'Caption_11'} color={'GRAY600'}>
          {data?.author.fullName}
        </Text>
        {userData._id === data?.author._id ? (
          ''
        ) : (
          <Button
            buttonType={'Small'}
            backgroundColor={
              userData.following.find((object) => object.user === data?.author._id)
                ? 'GREEN'
                : 'BEIGE'
            }
            value={
              userData.following.find((object) => object.user === data?.author._id)
                ? '팔로잉'
                : '팔로우'
            }
            onClick={
              userData.following.find((object) => object.user === data?.author._id)
                ? (e) =>
                    handleUnFollow(
                      e,
                      userData.following.find((object) => object.user === data?.author._id)
                        ?._id as string,
                    )
                : (e) => handleFollow(e, data?.author._id as string)
            }
          />
        )}
      </FlexBox>
    </FlexBox>
  )
}

export default HandleFollow
