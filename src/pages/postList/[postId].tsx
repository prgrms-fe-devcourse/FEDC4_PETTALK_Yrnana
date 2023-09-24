import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Comment from '@/assets/icons/Comment'
import Favorite from '@/assets/icons/Favorite'
import Button from '@/components/common/button'
import { FlexBox } from '@/components/common/flexBox'
import Loading from '@/components/common/loading'
import Padding from '@/components/common/Padding'
import ProfileImage from '@/components/common/profileImage'
import { Text } from '@/components/common/text'
import TextArea from '@/components/common/textarea'
import { Follow } from '@/libs/apis/auth/authType'
import CommentApi from '@/libs/apis/comment/CommentApi'
import { CommentType } from '@/libs/apis/comment/commentType'
import PostApi from '@/libs/apis/post/postApi'
import { Like } from '@/libs/apis/post/postType'
import { queryClient } from '@/libs/apis/queryClient'
import { UserApi } from '@/libs/apis/user/userApi'
import { useNotification } from '@/libs/hooks/useNotification'
import { userAtom } from '@/libs/store/userAtom'

const PostDetailPage = () => {
  const [userData, setUserData] = useAtom(userAtom)
  const channelID = useLocation().pathname.split('/')[2]
  const postId = useLocation().pathname.split('/')[3]
  const commentRef = useRef<HTMLTextAreaElement>(null)
  const [like, setLike] = useState(false)
  const [animate, setAnimate] = useState(false)
  const mainElement = document.querySelector('main')
  const [mainOffsetWidth, setMainOffsetWidth] = useState(mainElement?.offsetWidth)
  const [mainOffsetHeight, setMainOffsetHeight] = useState(mainElement?.offsetHeight)
  const navigate = useNavigate()
  const { data, isLoading, refetch } = useQuery(['posts', postId], () =>
    PostApi.DETAIL_POST(postId),
  )

  window.addEventListener('resize', () => {
    setMainOffsetWidth(mainElement!.offsetWidth)
    setMainOffsetHeight(mainElement!.offsetHeight)
  })

  useEffect(() => {
    if (userData.likes.find((data) => data.post === postId)) {
      setLike(true)
    }
  }, [])

  const likeMutation = useMutation(PostApi.LIKE_POST, {
    onSettled: () => {
      setLike(true)
      setAnimate(true)
      queryClient.invalidateQueries(['posts', postId])
    },
    onSuccess: (like: Like) => {
      setUserData({ ...userData, likes: [...userData.likes, like] })
      useNotification({
        postId: postId,
        userId: like.user,
        type: 'LIKE',
        typeId: like._id,
      })
    },
  })

  const unlikeMutation = useMutation(PostApi.UNLIKE_POST, {
    onSettled: () => {
      setLike(false)
      setAnimate(false)
      queryClient.invalidateQueries(['posts', postId])
    },
    onSuccess: (like: Like) => {
      const filtered = userData.likes.filter((data) => data._id !== like._id)
      setUserData({ ...userData, likes: [...filtered] })
    },
  })

  const followMutation = useMutation(UserApi.FOLLOW_USER, {
    onSettled: () => {
      queryClient.invalidateQueries(['posts', postId])
    },
    onSuccess: (follow: Follow) => {
      setUserData({ ...userData, following: [...userData.following, follow] })

      useNotification({
        postId: postId,
        userId: follow.user,
        type: 'FOLLOW',
        typeId: follow._id,
      })
    },
  })

  const unfollowMutation = useMutation(UserApi.UNFOLLOW_USER, {
    onSettled: () => {
      queryClient.invalidateQueries(['posts', postId])
    },
    onSuccess: (follow: Follow) => {
      const filtered = userData.following.filter((data) => data._id !== follow._id)
      setUserData({ ...userData, following: [...filtered] })
    },
  })

  const commentCreateMutation = useMutation(CommentApi.CREATE_COMMENT, {
    onSuccess: (comment: CommentType) => {
      if (commentRef.current) commentRef.current.value = ''
      refetch()
      useNotification({
        postId: postId,
        userId: comment.author._id,
        type: 'COMMENT',
        typeId: comment._id,
      })
    },
    onError: (error) => {
      console.log('댓글 오류 발생', error)
    },
  })

  const commentDeleteMutation = useMutation(CommentApi.DELETE_COMMENT, {
    onSuccess: () => {
      refetch()
    },
    onError: (error) => {
      console.log('댓글 삭제 오류 발생', error)
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

  if (isLoading) {
    return <Loading />
  }

  const postData = JSON.parse(data?.title as string)

  const deletePost = async (postId: string) => {
    deletePostMutation.mutate(postId)
  }

  const handleCreateComment = async (e: React.MouseEvent<HTMLButtonElement>, postId: string) => {
    e.preventDefault()
    if (commentRef.current?.value) {
      commentCreateMutation.mutateAsync({
        comment: commentRef.current?.value as string,
        postId: postId,
      })
    } else {
      alert('댓글을 입력해주세요!')
    }
  }

  const handleDeleteComment = async (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    e.preventDefault()
    commentDeleteMutation.mutateAsync(id)
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

  const handleFollow = (e: React.MouseEvent<HTMLButtonElement>, userId: string) => {
    e.preventDefault()
    followMutation.mutate(userId)
  }

  const handleUnFollow = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault()
    unfollowMutation.mutate(id)
  }

  return (
    <DetailContainer>
      <FlexBox
        direction={'row'}
        justify={'space-between'}
        align={'center'}
        fullWidth={true}
        style={{ padding: '30px' }}
      >
        <Text typo={'Headline_25'}>{`${
          postData.title.length > 17 ? `${postData.title.slice(0, 17)}...` : postData.title
        }`}</Text>
        <Text typo={'Caption_11'} color={'GRAY500'}>
          {data?.createdAt.slice(0, 10)}
        </Text>
      </FlexBox>
      {data?.image ? (
        <Image imageurl={data?.image} />
      ) : (
        <Image>
          <Text typo={'Headline_25'} color={'GRAY500'}>
            {'이미지가 없습니다.'}
          </Text>
        </Image>
      )}
      <ContentContainer height={mainOffsetHeight!}>
        <Padding size={20}>
          <Text typo={'Body_16'} color={'BLACK'}>
            {postData.body}
          </Text>
        </Padding>
        <Info>
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
                like
                  ? () => handleRemoveFavorite()
                  : () => handleCreateFavorite(data?._id as string)
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
                  onClick={() => deletePost(data?._id as string)}
                />
              </>
            ) : (
              ''
            )}
          </FlexBox>
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
        </Info>
        <VerticalLine />
        <Comments>
          {data?.comments.map((comment, index) => (
            <FlexBox direction={'column'} key={index} style={{ maxHeight: '250px' }}>
              <CommentContainer checkUser={userData._id === comment.author._id}>
                <SingleComment>
                  <ProfileImage
                    size={30}
                    style={{ marginRight: '10px' }}
                    image={comment.author.image}
                  />
                  <UserComment>
                    <Text typo={'Caption_11'}>{comment.author.fullName}</Text>
                    <Text typo={'SubHead_14'}>{comment.comment}</Text>
                  </UserComment>
                </SingleComment>

                <Text
                  typo={'Caption_11'}
                  color={'GRAY500'}
                  style={{ width: '100px', padding: '10px 20px' }}
                >
                  {comment.createdAt.slice(0, 10)}
                </Text>
                {userData._id === comment.author._id ? (
                  <Text
                    typo={'Body_16'}
                    onClick={(e) => handleDeleteComment(e, comment._id)}
                    style={{ cursor: 'pointer', position: 'absolute', right: 10 }}
                    color={'GRAY500'}
                  >
                    {'✖'}
                  </Text>
                ) : (
                  ''
                )}
              </CommentContainer>
              <VerticalLine key={comment._id} />
            </FlexBox>
          ))}
        </Comments>
        <WriteComment width={mainOffsetWidth!}>
          <TextArea placeholder={'댓글을 입력해주세요.'} ref={commentRef}></TextArea>
          <Button
            buttonType={'Medium'}
            value={'작성하기'}
            onClick={(e) => handleCreateComment(e, data?._id as string)}
          />
        </WriteComment>
      </ContentContainer>
    </DetailContainer>
  )
}

const DetailContainer = styled.div`
  width: 100%;
  background-color: #f6f6f6;
  border-radius: 20px;
  position: relative;
  height: 100%;
`

const Image = styled.div<{ imageurl?: string }>`
  ${({ imageurl }) => css`
    background: url(${imageurl});
  `};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`

const ContentContainer = styled.div<{ height: number }>`
  width: 100%;
  height: calc(${(props) => props.height - 510}px);
  @media (max-height: 667px) {
    height: calc(${(props) => props.height - 470}px);
  }
  @media (min-height: 1180px) {
    height: calc(${(props) => props.height - 525}px);
  }
  @media (min-height: 1368px) {
    height: calc(${(props) => props.height - 578}px);
  }
  display: flex;
  flex-direction: column;
`

const Info = styled.div`
  display: flex;
  padding: 0 20px 0 20px;
  justify-content: space-between;
`

const Comments = styled.div`
  width: 100%;
  overflow: scroll;
  height: 60%;
  @media (min-height: 1180px) {
    height: 65%;
  }
  @media (min-height: 1368px) {
    height: 70%;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`

const UserComment = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const CommentContainer = styled.div<{ checkUser: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;

  @media (min-width: 769px) {
    &:hover {
      :nth-of-type(1) {
        transform: ${(props) => (props.checkUser ? 'translateX(-10px)' : '')};
        transition: transform 0.5s ease-in-out;
      }
    }
  }
`

const SingleComment = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  @media (max-width: 768px) {
    padding: 5px 20px;
  }
`

const WriteComment = styled.form<{ width: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: ${(props) => props.width - 20}px;
  position: fixed;
  bottom: 4px;
  padding: 10px;
  box-sizing: border-box;
`

const VerticalLine = styled.hr`
  width: 90%;
`

export default PostDetailPage
