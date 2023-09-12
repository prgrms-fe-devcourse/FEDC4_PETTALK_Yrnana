import { useRef } from 'react'

import Button from '@/components/common/button'
import Input from '@/components/common/input'
const CreateChannel = () => {
  const channelInputRef = useRef<HTMLInputElement>('')
  return (
    <>
      <Input width={250} ref={channelInputRef} placeholder={'채널명을 생성해주세요'} />
      <Button buttonType={'Large'} value={'채널 생성하기'}></Button>
    </>
  )
}
export default CreateChannel
