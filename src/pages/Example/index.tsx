import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useRef, useState } from 'react'
import { FormEvent } from 'react'

import { FlexBox } from '@/components/common/flexBox'
import { Text } from '@/components/common/text'
import ImageUploader from '@/components/posts/ImageUploader'
import { axiosAPI } from '@/libs/apis/axios'
import encodeFileToBase64 from '@/libs/utils/encodeFileToBase64'
import { theme } from '@/styles/theme'
const ExamplePage = () => {
  const [imgFile, setImgFile] = useState('')
  const imgRef = useRef(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [curImage, setCurImage] = useState<any>(null)
  // console.log(curImage)
  // console.log(curImage?.split(',')[1])
  const [uploadedFile, setUploadFile] = useState<File | null>(null)
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
  const imagePost = () => {
    axiosAPI
      .post(
        '/users/upload-photo',
        {
          isCover: false,
          image: uploadedFile,
        },
        {
          headers: {
            Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1MDJhYTM3YWE0MDA0NWY1Y2ZmN2IyZiIsImVtYWlsIjoibmV3amVhbnMifSwiaWF0IjoxNjk0NzYxOTE2fQ.dIC03yB0pCLn3SUwu8kFd1UUaoqNuXEJ775oGb_116E`,
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then((response) => {
        console.log(response)
        //setImgSRC(response.data.image)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
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
      <button onClick={imagePost}>{'보내기'}</button>
      {/* <input type={'file'} ref={imgRef} onChange={saveImgFile} />
      <button onClick={imagePost}>{'보내기'}</button>
      <img src={imgSRC} width={200} alt={''} /> */}
    </>
  )
}
export default ExamplePage

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
