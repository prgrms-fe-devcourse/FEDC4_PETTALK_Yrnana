import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'

import Comment from '@/assets/icons/Comment'
import Favorite from '@/assets/icons/Favorite'
import Button from '@/components/common/button'
import ProfileImage from '@/components/common/profileImage'
import { Text } from '@/components/common/text'
import PostApi from '@/libs/apis/post/postApi'

const PostDetailPage = () => {
  const postId = useLocation().pathname.split('/')[3]
  const { data, isLoading } = useQuery(['posts', postId], () => PostApi.DETAIL_POST(postId))
  return (
    <DetailContainer>
      <Title>
        <Text typo={'Headline_25'}>{data?.title}</Text>
        <Date>{data?.createdAt}</Date>
      </Title>
      <Image src={data?.image} />
      <ContentContainer>
        <Content>{data?.channel.description}</Content>
        <Info>
          <Favorite />
          {data?.likes.length}
          <Comment />
          {data?.comments.length}
          <User>
            <ProfileImage size={50} />
            <Author>{data?.author.fullName}</Author>
            <Button buttonType={'Small'} value={'팔로우'} />
          </User>
        </Info>
        <Comments></Comments>
        <WriteComments>
          <textarea></textarea>
          <Button buttonType={'Medium'} value={'작성하기'} />
        </WriteComments>
      </ContentContainer>
    </DetailContainer>
  )
}

const DetailContainer = styled.div`
  width: 100%;
`

const Title = styled.div`
  width: 100%;
`

const Date = styled.div``

const Image = styled.img`
  width: 100%;
`

const ContentContainer = styled.div`
  width: 100%;
`

const Content = styled.div`
  width: 100%;
`

const Info = styled.div`
  width: 100%;
`

const User = styled.div``

const Author = styled.div``

const Comments = styled.div`
  width: 100%;
`

const WriteComments = styled.form`
  width: 100%;
`

export default PostDetailPage
