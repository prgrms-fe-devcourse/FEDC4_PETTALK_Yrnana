import styled from '@emotion/styled'
import { useMutation } from '@tanstack/react-query'
import { ComponentProps, useEffect, useState } from 'react'

import defaultImage from '@/assets/images/profile.png'
import PostImageApi from '@/libs/apis/postImage/postImageApi'
import encodeFileToBase64 from '@/libs/utils/encodeFileToBase64'

interface ProfileImageProps extends ComponentProps<'div'> {
  size: number
  image: string
  updatable: boolean
}

interface ImageProps {
  size: number
}

const ProfileImage = ({
  size,
  image = defaultImage,
  updatable = true,
  ...props
}: ProfileImageProps) => {
  const postMutation = useMutation(PostImageApi.CREATE_POST)
  const [loadable, setLoadable] = useState(false)
  const [selectedImage, setSelectedImage] = useState(image)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files![0]
    encodeFileToBase64(selectedFile, setSelectedImage)

    postMutation.mutate({
      isCover: false,
      image: btoa(selectedImage),
    })
    // if (selectedFile) {
    //   const reader = new FileReader()

    //   reader.onload = (e) => {
    //     const result = e.target?.result as string
    //     setSelectedImage(result)
    //   }
    //   reader.readAsDataURL(selectedFile)
    // }
  }
  useEffect(() => {
    if (updatable) {
      setLoadable(true)
    }
  }, [])
  return (
    <span {...props}>
      <label htmlFor={'fileInput'}>
        <Image src={selectedImage} size={size} alt={''} />
      </label>
      {loadable ? (
        <input
          type={'file'}
          id={'fileInput'}
          style={{ display: 'none' }}
          accept={'image/*'}
          onChange={handleFileChange}
        />
      ) : null}
    </span>
  )
}

const Image = styled.img<ImageProps>`
  width: ${(props) => props.size + 'px'};
  height: ${(props) => props.size + 'px'};
  border-radius: 50%;
`

export default ProfileImage
