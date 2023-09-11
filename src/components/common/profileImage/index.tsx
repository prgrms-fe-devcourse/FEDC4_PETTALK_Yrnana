import styled from '@emotion/styled'
import { useEffect, useState } from 'react'

import defaultImage from '@/assets/images/profile.png'

interface ProfileImageProps {
  size: number
  image: string
  updatable: boolean
  //   updateImage?: Uint8Array
}

interface ImageProps {
  size: number
}

const ProfileImage = ({ size, image = defaultImage, updatable = true }: ProfileImageProps) => {
  const [loadable, setLoadable] = useState(false)
  const [selectedImage, setSelectedImage] = useState(image)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files![0]
    if (selectedFile) {
      const reader = new FileReader()

      reader.onload = (e) => {
        const result = e.target?.result as string
        setSelectedImage(result)
      }
      reader.readAsDataURL(selectedFile)
    }
  }
  useEffect(() => {
    if (updatable) {
      setLoadable(true)
    }
  }, [])
  //   const mimeType = 'image/png'
  //   const base64ImageData = btoa(String.fromCharCode(...updateImage))
  //   const dataUrl = `data:${mimeType};base64,${base64ImageData}`
  return (
    <div>
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
    </div>
  )
}

const Image = styled.img<ImageProps>`
  width: ${(props) => props.size + 'px'};
  height: ${(props) => props.size + 'px'};
  border-radius: 50%;
`

export default ProfileImage