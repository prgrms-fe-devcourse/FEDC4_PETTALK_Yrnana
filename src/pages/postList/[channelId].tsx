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
  const { data, isLoading } = useQuery(['posts'], () => PostApi.GET_POSTS(channelID))
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
        <FlexBox gap={20} direction={'column'}>
          {data?.map((post, index) => (
            <PostCard
              onClick={() => navigate(`/posts/${channelID}/${post._id}`)}
              commentsNum={post.comments.length}
              likesNum={post.likes.length}
              key={index}
              title={post.title}
              author={post.author}
              content={'크하하하'}
              createdAt={post.createdAt}
            />
          ))}
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
  padding-bottom: 30px;
  overflow-y: scroll;
`

const NewPostButton = styled.button`
  width: 50px;
  height: 30px;
  border-radius: 10px;
  background-color: ${theme.palette.CORAL};
`
