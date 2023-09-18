import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useMutation } from '@tanstack/react-query'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import Button from '@/components/common/button'
import { FlexBox } from '@/components/common/flexBox'
import { Text } from '@/components/common/text'
import ImageUploader from '@/components/posts/ImageUploader'
import PostApi from '@/libs/apis/post/postApi'
import { Post } from '@/libs/apis/post/postType'
import { queryClient } from '@/libs/apis/queryClient'
import encodeFileToBase64 from '@/libs/utils/encodeFileToBase64'
import { theme } from '@/styles/theme'

const EditPostPage = () => {
  const postMutation = useMutation(PostApi.CREATE_POST, {
    onSuccess: (newPost: Post) => {
      queryClient.setQueryData(['posts', channelID, newPost._id], newPost)
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
  }

  const handleCreatePost = () => {
    const formData = new FormData()
    if (title && contents) {
      const json = {
        title: title,
        body: contents,
      }
      formData.append('title', JSON.stringify(json))
      formData.append('channelId', channelID)
      if (uploadFile) formData.append('image', uploadFile, 'myfile')
      postMutation.mutate(formData)
    } else {
      alert('게시글 내용이 비었습니다!')
    }
  }
  return (
    <NewPostContainer>
      <form onSubmit={handleSubmit}>
        <TitleInput
          placeholder={'제목을 입력해주세요'}
          value={title ? title : ''}
          onChange={(e: { target: { value: string } }) => {
            if (e.target.value.length > 20) return
            setTitle(e.target.value)
          }}
        />
        <ImageBoxWrapper>
          {curImage === null || '' ? (
            <ImageUploader
              uploadFileHandler={uploadHandler}
              fileTypeErrorHandler={() => {
                console.log('file type err')
              }}
              fileNumErrorHandler={() => {
                console.log('file num err')
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
          placeholder={'내용을 입력해주세요'}
          value={contents ? contents : ''}
          onChange={(e: { target: { value: string } }) => setContents(e.target.value)}
        />
      </form>
      <ButtonContainer>
        <Button buttonType={'ExtraLarge'} value={'수정하기'} onClick={handleCreatePost} />
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
  line-height: 100%;

  ${({ theme }) => theme.typo.Body_16};
  color: ${({ theme }) => theme.palette.GRAY700};

  ::placeholder {
    ${({ theme }) => theme.typo.Body_16}
    color: ${({ theme }) => theme.palette.GRAY400};
  }
`
