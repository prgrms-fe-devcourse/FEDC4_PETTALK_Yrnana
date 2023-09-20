import styled from '@emotion/styled'
import { ComponentProps, RefObject, useEffect, useRef, useState } from 'react'

import defaultImage from '@/assets/images/defaultProfileImage.png'
import { axiosAPI } from '@/libs/apis/axios'

interface ProfileImageProps extends ComponentProps<'div'> {
  size: number
  image: string
  updatable?: boolean
}

interface ImageProps {
  size: number
}

const ProfileImage = ({
  size,
  image = defaultImage,
  updatable = false,
  ...props
}: ProfileImageProps) => {
  const [selectedImage, setSelectedImage] = useState('')
  const imgRef = useRef<HTMLInputElement>(null) as RefObject<HTMLInputElement>

  useEffect(() => {
    setSelectedImage(image)
  }, [image])

  const handleImageChange = () => {
    if (imgRef.current && imgRef.current?.files) {
      if (imgRef.current.files[0].length === 0) return

      axiosAPI
        .post(
          '/users/upload-photo',
          {
            isCover: false,
            image: imgRef.current?.files[0],
          },
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then((response) => {
          setSelectedImage(response.data.image)
        })
    }
  }

  return (
    <span {...props}>
      <label htmlFor={'fileInput'}>
        <Image src={selectedImage} size={size} alt={''} />
      </label>
      {updatable ? (
        <input
          type={'file'}
          ref={imgRef}
          id={'fileInput'}
          style={{ display: 'none' }}
          accept={'image/*'}
          onChange={handleImageChange}
        />
      ) : null}
    </span>
  )
}

const Image = styled.img<ImageProps>`
  width: ${(props) => props.size + 'px'};
  height: ${(props) => props.size + 'px'};
  border-radius: 50%;
  object-fit: cover;
`

export default ProfileImage
