import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ComponentProps } from 'react'

import Comment from '@/assets/icons/Comment'
import Favorite from '@/assets/icons/Favorite'
import { FlexBox } from '@/components/common/flexBox'
import ListRow from '@/components/common/ListRow'
import SvgWithText from '@/components/common/svgWithText'
import { Text } from '@/components/common/Text'
import { User } from '@/libs/apis/auth/authType'
import { media } from '@/styles/theme'
import { theme } from '@/styles/theme'

interface PostCardProps extends ComponentProps<'div'> {
  likesNum: number
  commentsNum: number
  image?: string
  title: string
  content: string
  author: User
  createdAt: string
  likeStatus?: boolean
}

const PostCard = ({
  likesNum = 50,
  commentsNum = 33,
  image,
  title = '제목을 입력해주세요',
  content = '내용을 입력합니다 내용내용',
  author,
  createdAt = '2023.03.03',
  likeStatus = false,
  ...props
}: PostCardProps) => {
  return (
    <PostCardWrapper {...props}>
      <ListRow
        fullWidth={true}
        leftImage={author.image}
        mainText={
          <Text typo={'Caption_11'} color={'GRAY600'}>
            {author.fullName}
          </Text>
        }
        subElement={
          <Text typo={'SubHead_14'} color={'BLACK'}>
            {title}
          </Text>
        }
        rightElement={
          <Text typo={'Caption_11'} color={'GRAY500'}>
            {createdAt}
          </Text>
        }
      />
      {image && <ImageContainer imageurl={image} />}
      <FlexBox align={'center'} justify={'flex-start'} fullWidth={true}>
        <Text typo={'Caption_11'} color={'GRAY600'}>
          {content}
        </Text>
      </FlexBox>
      <FlexBox align={'center'} justify={'flex-start'} fullWidth={true} gap={10}>
        <SvgWithText
          svgComponent={<Favorite fill={likeStatus ? 'red' : 'none'} />}
          text={likesNum}
        />
        <SvgWithText svgComponent={<Comment />} text={commentsNum} />
      </FlexBox>
    </PostCardWrapper>
  )
}

export default PostCard

const PostCardWrapper = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  gap: 10px;
  border-radius: 10px;
  background-color: ${theme.palette.GRAY100};
  align-items: center;
  box-shadow:
    0px 0px 2px 0px rgba(0, 0, 0, 0.25),
    0px 4px 4px 0px rgba(0, 0, 0, 0.14);
`
const ImageContainer = styled.div<{ imageurl: string }>`
  ${({ imageurl }) => css`
    background: url(${imageurl});
  `};
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 200px;
  ${media.mobile} {
    height: 150px;
  }
`
