/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { FlexBox } from '@/components/common/flexBox'
import Input from '@/components/common/input'
import Loading from '@/components/common/loading'
import PostCard from '@/components/common/postCard'
import Spacing from '@/components/common/spacing'
import { Text } from '@/components/common/text'
import PostApi from '@/libs/apis/post/postApi'
import { Post } from '@/libs/apis/post/postType'
import { useDebounce } from '@/libs/hooks/useDebounce'
import { userAtom } from '@/libs/store/userAtom'
import { theme } from '@/styles/theme'

const PostListPage = () => {
  const userData = useAtomValue(userAtom)
  const [keyword, setKeyword] = useState<string>('')
  const [post, setPost] = useState<Post[]>([])
  const channelID = useLocation().pathname.split('/')[2]
  const { data, isLoading, isError } = useQuery(
    ['posts', channelID],
    () => PostApi.GET_POSTS(channelID),
    {
      cacheTime: 0,
    },
  )
  const debouncedValue = useDebounce(keyword, 200)
  const navigate = useNavigate()
  const handleSearchPost = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value)
      if (e.target.value === '' && data) {
        setPost(data)
        return
      }
      if (debouncedValue) fetchSearchData(debouncedValue)
    },
    [debouncedValue],
  )

  const fetchSearchData = async (keyword: string) => {
    const data = await PostApi.SEARCH_POST(keyword)
    const filterdData = data.filter((data) => 'title' in data && data.channel._id === channelID)
    if (filterdData) setPost(filterdData)
  }

  useEffect(() => {
    if (data) setPost(data)
  }, [data])

  useEffect(() => {
    if (debouncedValue) fetchSearchData(debouncedValue)
  }, [debouncedValue])

  return (
    <PostListPageWrapper>
      <FlexBox direction={'row'} gap={8} fullWidth={true}>
        <Input placeholder={'글 제목/내용으로 검색 가능합니다.'} onChange={handleSearchPost} />
        <NewPostButton onClick={() => navigate(`/posts/${channelID}/create`)}>
          <Text typo={'Headline_20'} as={'span'}>
            {'＋'}
          </Text>
        </NewPostButton>
      </FlexBox>
      {isLoading ? (
        <Loading />
      ) : (
        <FlexBox gap={20} fullWidth={true} direction={'column'}>
          {!post || post.length === 0 ? (
            <>
              <Spacing size={60} />
              <Text typo={'Body_16'} color={'GRAY600'}>
                {'포스트가 없습니다.'}
              </Text>
            </>
          ) : (
            post?.map((post, index) => {
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
                  likeStatus={post.likes.find((data) => data.user === userData._id) ? true : false}
                />
              )
            })
          )}
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
