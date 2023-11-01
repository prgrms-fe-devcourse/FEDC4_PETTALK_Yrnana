import styled from '@emotion/styled'
import { QueryObserverResult, useMutation } from '@tanstack/react-query'
import { useRef } from 'react'

import Button from '@/components/common/button'
import { FlexBox } from '@/components/common/flexBox'
import ProfileImage from '@/components/common/profileImage'
import { Text } from '@/components/common/Text'
import TextArea from '@/components/common/textarea'
import { User } from '@/libs/apis/auth/authType'
import CommentApi from '@/libs/apis/comment/commentApi'
import { CommentType } from '@/libs/apis/comment/commentType'
import { Post } from '@/libs/apis/post/postType'
import useModal from '@/libs/hooks/useModal'
import { useNotification } from '@/libs/hooks/useNotification'
import { theme } from '@/styles/theme'

interface Props {
  data: Post | undefined
  userData: User
  postId: string
  refetch: () => Promise<QueryObserverResult<Post, unknown>>
  mainOffsetWidth: number
  mainOffsetHeight: number
}

const HandleComment = ({
  data,
  userData,
  postId,
  refetch,
  mainOffsetWidth,
  mainOffsetHeight,
}: Props) => {
  const commentRef = useRef<HTMLTextAreaElement>(null)
  const { openModal } = useModal()

  const commentCreateMutation = useMutation(CommentApi.CREATE_COMMENT, {
    onSuccess: (comment: CommentType) => {
      if (commentRef.current) commentRef.current.value = ''
      refetch()
      data?.author._id !== userData._id
        ? useNotification({
            postId: postId,
            userId: data !== undefined ? data?.author._id : '',
            type: 'COMMENT',
            typeId: comment._id,
          })
        : ''
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

  const handleCreateComment = async (e: React.MouseEvent<HTMLButtonElement>, postId: string) => {
    e.preventDefault()
    if (commentRef.current?.value) {
      commentCreateMutation.mutateAsync({
        comment: commentRef.current?.value as string,
        postId: postId,
      })
    } else {
      openModal({ content: '댓글을 입력해주세요!', type: 'warning' })
    }
  }

  const handleDeleteComment = async (e: React.MouseEvent<HTMLDivElement>, id: string) => {
    e.preventDefault()
    commentDeleteMutation.mutateAsync(id)
  }

  return (
    <>
      <Comments>
        {data?.comments.map((comment, index) => (
          <FlexBox direction={'column'} key={index} style={{ maxHeight: '250px' }}>
            <CommentContainer checkUser={userData._id === comment.author._id}>
              <SingleComment>
                {userData._id === comment.author._id ? (
                  <ProfileImage size={30} style={{ marginRight: '10px' }} image={userData.image} />
                ) : (
                  <ProfileImage
                    size={30}
                    style={{ marginRight: '10px' }}
                    image={comment.author.image}
                  />
                )}
                <UserComment>
                  <Text typo={'Caption_11'} color={'BLACK'}>
                    {comment.author.fullName}
                  </Text>
                  <Text typo={'SubHead_14'} color={'BLACK'}>
                    {comment.comment}
                  </Text>
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
        <TextArea
          height={mainOffsetHeight! < 1000 ? mainOffsetHeight! - 1000 : 50}
          placeholder={'댓글을 입력해주세요.'}
          ref={commentRef}
        ></TextArea>
        <Button
          buttonType={'Medium'}
          value={'작성하기'}
          onClick={(e) => handleCreateComment(e, data?._id as string)}
        />
      </WriteComment>
    </>
  )
}

export default HandleComment

const Comments = styled.div`
  width: 100%;
  overflow: scroll;
  height: 43%;
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
  background-color: ${theme.palette.BACKGROUND};
  border-radius: 20px;
`

const VerticalLine = styled.hr`
  width: 90%;
`
