import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Comment from '@/assets/icons/Comment'
import Favorite from '@/assets/icons/Favorite'
import Button from '@/components/common/button'
import Loading from '@/components/common/loading'
import ProfileImage from '@/components/common/profileImage'
import { Text } from '@/components/common/text'
import { axiosAPI } from '@/libs/apis/axios'
import PostApi from '@/libs/apis/post/postApi'

const PostDetailPage = () => {
  const channelID = useLocation().pathname.split('/')[2]
  const postId = useLocation().pathname.split('/')[3]
  const { data, isLoading } = useQuery(['posts', postId], () => PostApi.DETAIL_POST(postId))
  const [comment, setComment] = useState('')
  const [likes, setLikes] = useState(data?.likes.length)
  const [like, setLike] = useState(false)
  const navigate = useNavigate()

  if (isLoading) {
    return <Loading />
  }

  const postData = JSON.parse(data?.title as string)

  const deletePost = async (postId: string) => {
    const response = await axiosAPI.delete('/posts/delete', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id: postId,
      },
    })
    navigate(`/posts/${channelID}`, { replace: true })
    return response
  }

  const handleCreateComment = async (postId: string) => {
    axiosAPI.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    if (comment) {
      const response = await axiosAPI.post('/comments/create', {
        comment: comment,
        postId: postId,
      })
      return response
    } else {
      alert('댓글을 입력해주세요!')
    }
  }

  const handleCreateFavorite = async (postId: string) => {
    setLike(true)
    axiosAPI.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    const response = await axiosAPI.post('/likes/create', {
      postId: postId,
    })
    setLikes(data?.likes.length)
    return response
  }

  const handleRemoveFavorite = async (id: string) => {
    setLike(false)
    axiosAPI.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    const response = await axiosAPI.post('/likes/delete', {
      id: id,
    })
    setLikes(data?.likes.length)
    return response
  }

  return (
    <DetailContainer>
      <Title>
        <Text typo={'Headline_25'}>{postData.title}</Text>
        <Text typo={'Caption_11'} color={'GRAY500'}>
          {data?.createdAt.slice(0, 10)}
        </Text>
      </Title>
      <Image src={data?.image} />
      <ContentContainer>
        <Content>
          <Text typo={'Body_16'} color={'BLACK'}>
            {postData.body}
          </Text>
        </Content>
        <Info>
          <Interaction>
            <Favorite
              fill={like ? 'red' : 'none'}
              onClick={
                like
                  ? () => handleRemoveFavorite(data?.likes[data?.likes.length - 1]._id as string)
                  : () => handleCreateFavorite(data?._id as string)
              }
              style={{ cursor: 'pointer' }}
            />
            <Text typo={'Caption_11'} color={'GRAY500'}>
              {data?.likes.length}
            </Text>
            <Comment />
            <Text typo={'Caption_11'} color={'GRAY500'}>
              {data?.comments.length}
            </Text>
            <Button buttonType={'Small'} value={'수정'} />
            <Button
              buttonType={'Small'}
              value={'삭제'}
              onClick={() => deletePost(data?._id as string)}
            />
          </Interaction>
          <User>
            <ProfileImage size={50} />
            <UserDetail>
              <Text typo={'Caption_11'} color={'GRAY600'}>
                {data?.author.fullName}
              </Text>
              <Button buttonType={'Small'} value={'팔로우'} />
            </UserDetail>
          </User>
        </Info>
        <VerticalLine />
        <Comments>
          {data?.comments.map((comment, index) => (
            <>
              <SingleComment key={index}>
                <ProfileImage size={30} style={{ marginRight: '10px' }} />
                {comment.comment}
                <Text typo={'Caption_11'} color={'GRAY500'}>
                  {comment.createdAt.slice(0, 10)}
                </Text>
              </SingleComment>
              <VerticalLine key={comment._id} />
            </>
          ))}
        </Comments>
        <WriteComment>
          <StyledTextArea
            placeholder={'댓글을 입력해주세요.'}
            value={comment ? comment : ''}
            onChange={(e: { target: { value: string } }) => setComment(e.target.value)}
          />
          <Button
            buttonType={'Medium'}
            value={'작성하기'}
            onClick={() => handleCreateComment(data?._id as string)}
          />
        </WriteComment>
      </ContentContainer>
    </DetailContainer>
  )
}

const DetailContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f6f6f6;
  border-radius: 20px;
`

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
`

const Image = styled.img`
  width: 100%;
  height: 40%;
  border-radius: 20px;
`

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  width: 100%;
  padding: 20px;
`

const Info = styled.div`
  width: 100%;
  display: flex;
  padding: 0 20px 0 20px;
  justify-content: space-between;
`

const Interaction = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  gap: 5px;
`

const User = styled.div`
  display: flex;
  gap: 5px;
`

const UserDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

const Comments = styled.div`
  width: 100%;
  height: 130px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`

const SingleComment = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
`

const WriteComment = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 10px;
`

const StyledTextArea = styled.textarea`
  box-sizing: border-box;
  border: none;
  resize: none;
  background: white;
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  height: 100px;
  line-height: 100%;

  ${({ theme }) => theme.typo.Body_16};
  color: ${({ theme }) => theme.palette.GRAY700};

  ::placeholder {
    ${({ theme }) => theme.typo.Body_16}
    color: ${({ theme }) => theme.palette.GRAY400};
  }
`

const VerticalLine = styled.hr`
  width: 90%;
`

export default PostDetailPage
