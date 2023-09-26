import styled from '@emotion/styled'
import { FileUploader } from 'react-drag-drop-files'

import { FlexBox } from '@/components/common/flexBox'
import { Text } from '@/components/common/Text'
export interface ImageUploaderProps {
  uploadFileHandler: (file: File) => void
  fileTypeErrorHandler: (err: Error) => void
  fileNumErrorHandler: () => void
}

const ImageUploader = ({
  uploadFileHandler,
  fileTypeErrorHandler,
  fileNumErrorHandler,
}: ImageUploaderProps) => {
  const fileTypes = ['png', 'jpeg', 'jpg']

  const fileUploaderHandler = (file: File) => {
    if (file.length === 0) {
      fileNumErrorHandler()
    } else {
      uploadFileHandler(file)
    }
  }
  return (
    <FileUploader
      handleChange={fileUploaderHandler} // 파일 업로드시 핸들러
      onTypeError={fileTypeErrorHandler} // 파일 타입 에러 핸들러
      types={fileTypes} // 파일 타입 종류
      dropMessageStyle={{ background: 'none', border: 'none' }} // 호버시 컴포넌트 스타일
    >
      <InputBox align={'center'} direction={'column'} gap={10}>
        <Text typo={'Body_13'} color={'GRAY600'}>
          {'이미지를 업로드해주세요🐾'}
        </Text>
      </InputBox>
    </FileUploader>
  )
}
export default ImageUploader

const InputBox = styled(FlexBox)`
  height: 100%;
`
