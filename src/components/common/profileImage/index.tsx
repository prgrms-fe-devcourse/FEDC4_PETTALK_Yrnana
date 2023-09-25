import styled from '@emotion/styled'
import { useAtom } from 'jotai'
import { ComponentProps, RefObject, useEffect, useRef, useState } from 'react'

import defaultImage from '@/assets/images/defaultProfileImage.png'
import { axiosAPI } from '@/libs/apis/axios'
import { userAtom } from '@/libs/store/userAtom'

interface ProfileImageProps extends ComponentProps<'div'> {
  size: number
  image: string
  updatable?: boolean
  online?: boolean
}

interface ImageProps {
  size: number
}

const ProfileImage = ({
  size,
  image = defaultImage,
  updatable = false,
  online = false,
  ...props
}: ProfileImageProps) => {
  const [userData, setUserData] = useAtom(userAtom)
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
          const updatedUser = { ...userData, image: response.data.image }
          setUserData(updatedUser)
        })
    }
  }

  return (
    <span>
      <label htmlFor={'fileInput'} style={{ position: 'relative' }}>
        <Image src={selectedImage} size={size} alt={''} {...props} />
        {online && <OnlineStatus />}
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
  position: relative;
  object-fit: cover;
`

const OnlineStatus = styled.div`
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: green;
  border-radius: 50px;
  bottom: 2px;
  right: 2px;
`

export default ProfileImage
