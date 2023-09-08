import styled from '@emotion/styled'
import defaultImage from '@/assets/images/profile.png'

interface ImageSize {
  size: number
  image: string
  //   updateImage?: Uint8Array
}

interface ImageProps {
  size: number
}

const ProfileImage = ({ size, image = defaultImage }: ImageSize) => {
  //   const mimeType = 'image/png'
  //   const base64ImageData = btoa(String.fromCharCode(...updateImage))
  //   const dataUrl = `data:${mimeType};base64,${base64ImageData}`
  return (
    <div>
      <Image src={image} size={size} alt="" />
    </div>
  )
}

const Image = styled.img<ImageProps>`
  width: ${(props) => props.size + 'px'};
  height: ${(props) => props.size + 'px'};
  border-radius: 50%;
`

export default ProfileImage
