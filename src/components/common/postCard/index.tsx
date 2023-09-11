import styled from '@emotion/styled'

import { FlexBox } from '@/components/common/flexBox'
import ListRow from '@/components/common/ListRow'
import { Text } from '@/components/common/Text'
import { theme } from '@/styles/theme'

interface PostCardProps {
  likesNum: number
  commentsNum: number
  image?: string
  title: string
  content: string
  author: string
  createdAt: string
}

// useEffect(() => {
//   console.log('받아온 정보를 이용하여 작성자 정보 알아오기')
// }, [])

const PostCard = ({
  likesNum = 50,
  commentsNum = 33,
  image = 'https://loremflickr.com/100/100/dog',
  title = '제목을 입력해주세요',
  content = '내용을 입력합니다 내용내용',
  author = '김유진',
  createdAt = '2023.03.03',
}: PostCardProps) => {
  return (
    <PostCardWrapper>
      <ListRow
        leftImage={<img src={'https://loremflickr.com/30/30/dog​​'} alt={'profileImage'} />}
        mainText={
          <Text typo={'Caption_11'} color={'GRAY600'}>
            {author}
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
      {image && <img src={image} />}
      <FlexBox align={'center'} justify={'flex-start'} fullWidth={true}>
        <Text typo={'Caption_11'} color={'GRAY600'}>
          {content}
        </Text>
      </FlexBox>
      <FlexBox align={'center'} justify={'flex-start'} fullWidth={true} gap={10}>
        <Text typo={'Body_12'} color={'GRAY500'}>
          {` 좋아요 : ${likesNum}`}
        </Text>
        <Text typo={'Body_12'} color={'GRAY500'}>
          {`댓글 :  ${commentsNum}`}
        </Text>
      </FlexBox>
    </PostCardWrapper>
  )
}

export default PostCard

const PostCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 331px;
  padding: 10px;
  gap: 10px;
  border-radius: 10px;
  background-color: ${theme.palette.GRAY100};
  align-items: center;
  box-shadow:
    0px 0px 2px 0px rgba(0, 0, 0, 0.25),
    0px 4px 4px 0px rgba(0, 0, 0, 0.14);
`
