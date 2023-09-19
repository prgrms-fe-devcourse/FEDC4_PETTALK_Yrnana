import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'

import Search from '@/assets/icons/Search'
import { FlexBox } from '@/components/common/flexBox'
import Input from '@/components/common/input'
import PostCard from '@/components/common/postCard'
import { Text } from '@/components/common/text'
import PostApi from '@/libs/apis/post/postApi'
import { theme } from '@/styles/theme'
const PostListPage = () => {
  const channelID = useLocation().pathname.split('/')[2]
  const { data, isLoading } = useQuery(['posts', channelID], () => PostApi.GET_POSTS(channelID))
  const navigate = useNavigate()
  return (
    <PostListPageWrapper>
      <FlexBox direction={'row'} gap={10} fullWidth={true}>
        <Input placeholder={'작성자/글 제목으로 검색 가능합니다.'} />
        <Search />
        <NewPostButton onClick={() => navigate(`/posts/${channelID}/create`)}>
          <Text typo={'Headline_20'} as={'span'}>
            {'＋'}
          </Text>
        </NewPostButton>
      </FlexBox>
      {isLoading ? (
        <div>{'로딩중...'}</div>
      ) : (
        <FlexBox gap={20} fullWidth={true} direction={'column'}>
          {data?.map((post, index) => {
            const titleJson = JSON.parse(post.title)
            const parsedDate = post.createdAt.split('T')[0]
            return (
              <PostCard
                onClick={() => navigate(`/posts/${channelID}/${post._id}`)}
                commentsNum={post.comments.length}
                likesNum={post.likes.length}
                key={index}
                image={post.image}
                title={titleJson.title}
                author={post.author}
                content={titleJson.body}
                createdAt={parsedDate}
              />
            )
          })}
        </FlexBox>
      )}
    </PostListPageWrapper>
  )
}

export default PostListPage

const PostListPageWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 100%;
  align-items: center;
  gap: 20px;
  padding: 0px 10px 30px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0px;
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f2f2f2;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #999;
  }
`

const NewPostButton = styled.button`
  width: 50px;
  height: 30px;
  border-radius: 10px;
  background-color: ${theme.palette.CORAL};
`
