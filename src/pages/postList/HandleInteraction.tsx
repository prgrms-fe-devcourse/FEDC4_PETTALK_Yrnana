import { useMutation } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Comment from '@/assets/icons/Comment'
import Favorite from '@/assets/icons/Favorite'
import Button from '@/components/common/button'
import { FlexBox } from '@/components/common/flexBox'
import { Text } from '@/components/common/Text'
import PostApi from '@/libs/apis/post/postApi'
import { Like, Post } from '@/libs/apis/post/postType'
import { queryClient } from '@/libs/apis/queryClient'
import { useConfirmModal } from '@/libs/hooks/useConfirmModal'
import { useNotification } from '@/libs/hooks/useNotification'
import { userAtom } from '@/libs/store/userAtom'

interface Props {
  data: Post | undefined
  postId: string
  channelID: string
  like: boolean
  setLike: React.Dispatch<React.SetStateAction<boolean>>
}

const HandleInteraction = ({ data, postId, channelID, like, setLike }: Props) => {
  const [userData, setUserData] = useAtom(userAtom)
  const navigate = useNavigate()
  const { openConfirmModal } = useConfirmModal()
  const [animate, setAnimate] = useState(false)

  const likeMutation = useMutation(PostApi.LIKE_POST, {
    onSettled: () => {
      setLike(true)
      setAnimate(true)
      queryClient.invalidateQueries(['post', postId])
    },
    onSuccess: (like: Like) => {
      setUserData({ ...userData, likes: [...userData.likes, like] })
      data?.author._id !== userData._id
        ? useNotification({
            postId: postId,
            userId: data !== undefined ? data?.author._id : '',
            type: 'LIKE',
            typeId: like._id,
          })
        : ''
    },
  })

  const unlikeMutation = useMutation(PostApi.UNLIKE_POST, {
    onSettled: () => {
      setLike(false)
      setAnimate(false)
      queryClient.invalidateQueries(['post', postId])
    },
    onSuccess: (like: Like) => {
      const filtered = userData.likes.filter((data) => data._id !== like._id)
      setUserData({ ...userData, likes: [...filtered] })
    },
  })

  const deletePostMutation = useMutation(PostApi.DELETE_POST, {
    onSuccess: () => {
      navigate(`/posts/${channelID}`, { replace: true })
    },
    onError: (error) => {
      console.log('게시글 삭제 오류 발생', error)
    },
  })

  const deletePost = async (postId: string) => {
    deletePostMutation.mutate(postId)
  }

  const handleCreateFavorite = (postId: string) => {
    if (like) return
    likeMutation.mutate(postId)
  }
  const handleRemoveFavorite = () => {
    const likedPost = userData.likes.filter((data) => data.post === postId)
    const id = likedPost[0]._id
    unlikeMutation.mutate(id)
  }
  return (
    <FlexBox
      direction={'row'}
      justify={'center'}
      align={'center'}
      gap={5}
      style={{ alignSelf: 'flex-end' }}
    >
      <Favorite
        fill={like ? 'red' : 'none'}
        onClick={
          like ? () => handleRemoveFavorite() : () => handleCreateFavorite(data?._id as string)
        }
        style={{ cursor: 'pointer' }}
        className={`heart ${animate ? 'is_animating' : ''}`}
      />
      <Text typo={'Body_16'} color={'GRAY500'}>
        {data?.likes.length}
      </Text>
      <Comment />
      <Text typo={'Body_16'} color={'GRAY500'}>
        {data?.comments.length}
      </Text>
      {userData._id === data?.author._id ? (
        <>
          <Button
            buttonType={'Small'}
            value={'수정'}
            onClick={() => navigate(`/posts/${channelID}/${postId}/editpost`)}
          />
          <Button
            buttonType={'Small'}
            value={'삭제'}
            onClick={() =>
              openConfirmModal({
                confirmText: '게시물을 삭제하시겠습니까?',
                okFunc: () => deletePost(data?._id as string),
              })
            }
          />
        </>
      ) : (
        ''
      )}
    </FlexBox>
  )
}

export default HandleInteraction
