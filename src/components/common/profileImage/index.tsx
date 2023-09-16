import styled from '@emotion/styled'
import { ComponentProps, RefObject, useEffect, useRef, useState } from 'react'

import defaultImage from '@/assets/images/profile.png'
import { axiosAPI } from '@/libs/apis/axios'

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
  const [loadable, setLoadable] = useState(false)
  const [selectedImage, setSelectedImage] = useState(image)
  const imgRef = useRef<HTMLInputElement>(null) as RefObject<HTMLInputElement>

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
              Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1MDJhYTM3YWE0MDA0NWY1Y2ZmN2IyZiIsImVtYWlsIjoibmV3amVhbnMifSwiaWF0IjoxNjk0NzYxOTE2fQ.dIC03yB0pCLn3SUwu8kFd1UUaoqNuXEJ775oGb_116E`,
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then((response) => {
          console.log(response)
          setSelectedImage(response.data.image)
        })
    }
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
