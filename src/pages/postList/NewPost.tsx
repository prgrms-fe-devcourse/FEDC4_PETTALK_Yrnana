import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useMutation } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import Button from '@/components/common/button'
import { FlexBox } from '@/components/common/flexBox'
import { Text } from '@/components/common/Text'
import ImageUploader from '@/components/posts/ImageUploader'
import PostApi from '@/libs/apis/post/postApi'
import { Post } from '@/libs/apis/post/postType'
import { queryClient } from '@/libs/apis/queryClient'
import useModal from '@/libs/hooks/useModal'
import { urlAtom } from '@/libs/store/urlAtom'
import encodeFileToBase64 from '@/libs/utils/encodeFileToBase64'
import { theme } from '@/styles/theme'

const NewPostPage = () => {
  const setUrlData = useSetAtom(urlAtom)
  const { openModal } = useModal()
  const postMutation = useMutation(PostApi.CREATE_POST, {
    onSuccess: (newPost: Post) => {
      queryClient.setQueryData(['post', newPost._id], newPost)
      setUrlData({
        channelId: channelID,
        postId: newPost._id,
      })
      navigate(`/posts/${channelID}/${newPost._id}`)
    },
  })
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const navigate = useNavigate()
  const channelID = useLocation().pathname.split('/')[2]
  const [curImage, setCurImage] = useState<string | null>(null)
  const [title, setTitle] = useState<string | undefined>('')
  const [contents, setContents] = useState<string | undefined>('')
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const uploadHandler = (image: File) => {
    setUploadFile(image)
    encodeFileToBase64(image, setCurImage)
  }

  const deleteImageHandler = () => {
    setCurImage(null)
    setUploadFile(null)
  }

  const handleCreatePost = () => {
    const formData = new FormData()
    if (!title) {
      openModal({ content: '제목을 입력해주세요!', type: 'warning' })
    } else if (!contents) {
      openModal({ content: '내용을 입력해주세요!', type: 'warning' })
    } else if (!uploadFile) {
      openModal({ content: '이미지를 첨부해주세요!', type: 'warning' })
    } else {
      const json = {
        title: title,
        body: contents,
      }
      formData.append('title', JSON.stringify(json))
      formData.append('channelId', channelID)
      if (uploadFile) formData.append('image', uploadFile, 'myfile')
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
          {curImage === null || '' ? (
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
          placeholder={'내용을 입력해주세요(최대 100자)'}
          value={contents ? contents : ''}
          onChange={(e: { target: { value: string } }) => {
            if (e.target.value.length > 100) {
              openModal({ content: '게시글 내용은 최대 100자까지 가능합니다.', type: 'warning' })
              return
            }
            setContents(e.target.value)
          }}
        />
      </form>
      <ButtonContainer>
        <Button buttonType={'ExtraLarge'} value={'글 작성하기'} onClick={handleCreatePost} />
      </ButtonContainer>
    </NewPostContainer>
  )
}

export default NewPostPage

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
