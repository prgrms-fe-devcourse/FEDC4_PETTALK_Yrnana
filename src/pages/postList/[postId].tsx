import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useQuery } from '@tanstack/react-query'
import { useAtom, useSetAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { FlexBox } from '@/components/common/flexBox'
import Loading from '@/components/common/loading'
import Padding from '@/components/common/Padding'
import { Text } from '@/components/common/Text'
import PostApi from '@/libs/apis/post/postApi'
import { urlAtom } from '@/libs/store/urlAtom'
import { userAtom } from '@/libs/store/userAtom'
import HandleComment from '@/pages/postList/HandleComment'

import HandleFollow from './HandleFollow'
import HandleInteraction from './HandleInteraction'

const PostDetailPage = () => {
  const setUrlData = useSetAtom(urlAtom)
  const [userData] = useAtom(userAtom)
  const [like, setLike] = useState(false)
  const channelID = useLocation().pathname.split('/')[2]
  const postId = useLocation().pathname.split('/')[3]
  const mainElement = document.querySelector('main')
  const [mainOffsetWidth, setMainOffsetWidth] = useState(0)
  const [mainOffsetHeight, setMainOffsetHeight] = useState(0)
  const divRef = useRef<HTMLDivElement>(null)
  const [resizeFontSize, setResizeFontSize] = useState(
    window.matchMedia('(max-width: 412px)').matches,
  )
  const { data, isLoading, refetch } = useQuery(['post', postId], () => PostApi.DETAIL_POST(postId))

  window.addEventListener('resize', () => {
    if (mainElement) {
      setMainOffsetWidth(mainElement!.offsetWidth)
      setMainOffsetHeight(mainElement!.offsetHeight)
    }
  })

  useEffect(() => {
    if (userData.likes.find((data) => data.post === postId)) {
      setLike(true)
    }
    if (mainElement) {
      setMainOffsetWidth(mainElement.offsetWidth)
      setMainOffsetHeight(mainElement.offsetHeight)
    }
    refetch()
    const mediaQuery = window.matchMedia('(max-width: 412px)')
    const handleResize = (e: MediaQueryListEvent) => {
      setResizeFontSize(e.matches)
    }

    mediaQuery.addEventListener('change', handleResize)
    setResizeFontSize(mediaQuery.matches)

    return () => {
      mediaQuery.removeEventListener('change', handleResize)
    }
  }, [mainElement])

  useEffect(() => {
    if (userData.likes.find((data) => data.post === postId)) {
      setLike(true)
    }
    setUrlData({
      channelId: channelID,
      postId: postId,
    })
    if (window.visualViewport) {
      window.visualViewport.onresize = handleVisualViewPortResize
    }
  }, [])

  const handleVisualViewPortResize = () => {
    const currentVisualViewport = Number(window.visualViewport?.height)
    if (divRef.current) {
      divRef.current!.style.height = `${currentVisualViewport - 80}px`
      window.scrollTo(0, 40)
    }
  }

  if (isLoading) {
    return <Loading />
  }

  const postData = JSON.parse(data?.title as string)

  return (
    <DetailContainer>
      <FlexBox
        direction={'row'}
        justify={'space-between'}
        align={'center'}
        fullWidth={true}
        style={{ padding: '30px' }}
      >
        <Text typo={resizeFontSize ? 'Headline_20' : 'Headline_25'} color={'BLACK'}>{`${
          postData.title.length > 17 ? `${postData.title.slice(0, 17)}...` : postData.title
        }`}</Text>
        <Text typo={'Caption_11'} color={'GRAY500'} style={{ textAlign: 'center', width: '70px' }}>
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
        <Padding size={[20, 20, 0, 20]}>
          <Text
            typo={resizeFontSize ? 'Body_12' : 'Body_16'}
            color={'BLACK'}
            style={{ lineHeight: '130%' }}
          >
            {postData.body}
          </Text>
        </Padding>
        <Info>
          <HandleInteraction
            data={data}
            postId={postId}
            channelID={channelID}
            like={like}
            setLike={setLike}
          />
          <HandleFollow data={data} postId={postId} />
        </Info>
        <VerticalLine />
        <HandleComment
          data={data}
          userData={userData}
          postId={postId}
          refetch={() => refetch()}
          mainOffsetWidth={mainOffsetWidth}
          mainOffsetHeight={mainOffsetHeight}
        />
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
  height: calc(${(props) => props.height - 450}px);
  @media (max-height: 667px) {
    height: calc(${(props) => props.height - 370}px);
  }
  @media (min-height: 720px) {
    height: calc(${(props) => props.height - 480}px);
  }
  @media (min-height: 740px) {
    height: calc(${(props) => props.height - 470}px);
  }
  @media (min-height: 844px) {
    height: calc(${(props) => props.height - 510}px);
  }
  @media (min-height: 851px) {
    height: calc(${(props) => props.height - 480}px);
  }
  @media (min-height: 915px) {
    height: calc(${(props) => props.height - 550}px);
  }
  @media (min-height: 1180px) {
    height: calc(${(props) => props.height - 600}px);
  }
  @media (min-height: 1368px) {
    height: calc(${(props) => props.height - 650}px);
  }
  display: flex;
  flex-direction: column;
`

const Info = styled.div`
  display: flex;
  padding: 0 20px 0 20px;
  justify-content: space-between;
`

const VerticalLine = styled.hr`
  width: 90%;
`

export default PostDetailPage
