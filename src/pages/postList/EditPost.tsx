import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Button from '@/components/common/button'
import { FlexBox } from '@/components/common/flexBox'
import Loading from '@/components/common/loading'
import { Text } from '@/components/common/text'
import ImageUploader from '@/components/posts/ImageUploader'
import PostApi from '@/libs/apis/post/postApi'
import { Post } from '@/libs/apis/post/postType'
import { queryClient } from '@/libs/apis/queryClient'
import useModal from '@/libs/hooks/useModal'
import encodeFileToBase64 from '@/libs/utils/encodeFileToBase64'
import { theme } from '@/styles/theme'

const EditPostPage = () => {
  const { openModal } = useModal()
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const navigate = useNavigate()
  const channelID = useLocation().pathname.split('/')[2]
  const postId = useLocation().pathname.split('/')[3]
  const { data, isLoading } = useQuery(['post', postId], () => PostApi.DETAIL_POST(postId))
  const [curImage, setCurImage] = useState<string | null>('')
  const [title, setTitle] = useState<string | undefined>('')
  const [contents, setContents] = useState<string | undefined>('')
  const contentsRef = useRef<HTMLTextAreaElement>(null)
  const postMutation = useMutation(PostApi.UPDATE_POST, {
    onSettled: () => {
      queryClient.invalidateQueries(['post', postId])
    },
    onSuccess: (newPost: Post) => {
      queryClient.setQueryData(['post', newPost._id], newPost)
      navigate(`/posts/${channelID}/${postId}`, { replace: true })
    },
  })

  useEffect(() => {
    if (data) {
      const postData = JSON.parse(data?.title as string)
      setCurImage(data?.image)
      setTitle(postData.title)
      setContents(postData.body)
    }
  }, [data])

  if (isLoading) {
    return <Loading />
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const uploadHandler = (image: File) => {
    setUploadFile(image)
    encodeFileToBase64(image, setCurImage)
  }

  const deleteImageHandler = () => {
    setCurImage(null)
  }

  const handleEditPost = () => {
    const formData = new FormData()
    if (!title) {
      openModal({ content: '제목을 입력해주세요!', type: 'warning' })
    } else if (!contents) {
      openModal({ content: '내용을 입력해주세요!', type: 'warning' })
    } else if (!curImage) {
      openModal({ content: '이미지를 첨부해주세요!', type: 'warning' })
    } else {
      const json = {
        title: title,
        body: contents,
      }
      formData.append('title', JSON.stringify(json))
      formData.append('channelId', channelID)
      formData.append('postId', postId)
      if (uploadFile) formData.append('image', uploadFile)
      postMutation.mutate(formData)
    }
  }

  return (
    <NewPostContainer>
      <form onSubmit={handleSubmit}>
        <TitleInput
          placeholder={'제목을 입력해주세요'}
          value={title ? title : ''}
          onChange={(e: { target: { value: string } }) => {
            if (e.target.value.length > 20) {
              openModal({ content: '게시글 제목은 최대 20자까지 가능합니다.', type: 'warning' })
              return
            }
            setTitle(e.target.value)
          }}
        />
        <ImageBoxWrapper>
          {!curImage || '' ? (
            <ImageUploader
              uploadFileHandler={uploadHandler}
              fileTypeErrorHandler={() => {
                openModal({ content: '이미지 파일 형식은 png, jpg만 가능합니다.', type: 'error' })
              }}
              fileNumErrorHandler={() => {
                openModal({ content: '이미지 파일은 1개만 첨부가 가능합니다.', type: 'error' })
              }}
            />
          ) : (
            <FlexBox align={'center'} justify={'center'} direction={'column'}>
              <ImageContainer imageurl={curImage}>
                <Text
                  typo={'Body_16'}
                  onClick={deleteImageHandler}
                  style={{ cursor: 'pointer', margin: '10px' }}
                >
                  {'❌'}
                </Text>
              </ImageContainer>
            </FlexBox>
          )}
        </ImageBoxWrapper>
        <StyledTextArea
          placeholder={'내용을 입력해주세요(최대 200자)'}
          ref={contentsRef}
          value={contents}
          onChange={(e: { target: { value: string } }) => {
            if (e.target.value.length > 200) {
              openModal({ content: '게시글 내용은 최대 200자까지 가능합니다.', type: 'warning' })
              return
            }
            setContents(e.target.value)
          }}
        />
      </form>
      <ButtonContainer>
        <Button buttonType={'ExtraLarge'} value={'수정하기'} onClick={handleEditPost} />
      </ButtonContainer>
    </NewPostContainer>
  )
}

export default EditPostPage

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: absolute;
  bottom: 20px;
`

const NewPostContainer = styled.div`
  border-radius: 10px 10px 0px 0px;
  background-color: ${theme.palette.GRAY100};
  width: 100%;
  padding-top: 20px;
  height: 100%;
  position: relative;
`

const TitleInput = styled.input`
  box-sizing: border-box;
  border: none;
  resize: none;
  background: transparent;

  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  height: 100%;
  line-height: 100%;

  ${({ theme }) => theme.typo.Headline_20};
  color: ${({ theme }) => theme.palette.GRAY700};

  ::placeholder {
    ${({ theme }) => theme.typo.Headline_20}
    color: ${({ theme }) => theme.palette.GRAY400};
  }
`

const ImageBoxWrapper = styled.div`
  background-color: ${theme.palette.GRAY300};
  width: 100%;
  height: 250px;
  border-radius: 10px;
`

const ImageContainer = styled.div<{ imageurl: string }>`
  ${({ imageurl }) => css`
    background: url(${imageurl});
  `};
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  height: 250px;
`
const StyledTextArea = styled.textarea`
  box-sizing: border-box;
  border: none;
  resize: none;
  background: transparent;
  padding: 0px 10px;
  width: 100%;
  height: 200px;
  margin-top: 20px;
  line-height: 130%;

  ${({ theme }) => theme.typo.Body_16};
  color: ${({ theme }) => theme.palette.GRAY700};

  ::placeholder {
    ${({ theme }) => theme.typo.Body_16}
    color: ${({ theme }) => theme.palette.GRAY400};
  }
`
