import { useMutation } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '@/components/common/button'
import { FlexBox } from '@/components/common/flexBox'
import Input from '@/components/common/Input'
import Spacing from '@/components/common/Spacing'
import { Text } from '@/components/common/Text'
import { axiosAPI } from '@/libs/apis/axios'
import { ChannelApi } from '@/libs/apis/channel/ChannelApi'
import { queryClient } from '@/libs/apis/queryClient'
import useModal from '@/libs/hooks/useModal'
const CreateChannel = () => {
  const [openChannel, setOpenChannel] = useState(false)
  const navigate = useNavigate()
  const { openModal } = useModal()
  const ouathRegisterMutation = useMutation(ChannelApi.CREATE_CHANNEL, {
    onSuccess: () => {
      queryClient.invalidateQueries(['channels'])
      openModal({ content: '채널 생성 성공!', type: 'success' })
    },
  })
  const channelTitleRef = useRef<HTMLInputElement>(null)
  const channelDesRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (localStorage.getItem('role') === 'SuperAdmin') {
      axiosAPI.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    } else {
      openModal({ content: '관리자의 권한이 필요합니다!', type: 'warning' })
      navigate('/')
    }
  }, [])
  const handleCreateChannel = () => {
    if (channelTitleRef.current && channelDesRef.current) {
      if (channelTitleRef?.current.value === '') {
        openModal({ content: '채널명은 공백으로 설정할 수 없습니다!', type: 'warning' })
        return
      }
      ouathRegisterMutation.mutate({
        authRequired: openChannel,
        description: channelDesRef?.current.value,
        name: channelTitleRef?.current.value,
      })
      channelDesRef.current.value = ''
      channelTitleRef.current.value = ''
    }
  }
  return (
    <>
      <Text typo={'Headline_25'}>{'채널 생성하기'}</Text>
      <Spacing size={100} />
      <FlexBox direction={'column'} gap={20} align={'center'}>
        <Text typo={'Body_16'}>{'로그인한 유저만 채널을 볼 수 있도록 설정할까요?'}</Text>
        <FlexBox justify={'center'} align={'center'} direction={'row'} gap={40}>
          <Button
            buttonType={'Medium'}
            backgroundColor={openChannel ? 'CORAL' : undefined}
            value={'예'}
            onClick={() => setOpenChannel(true)}
          ></Button>
          <Button
            buttonType={'Medium'}
            backgroundColor={!openChannel ? 'CORAL' : undefined}
            value={'아니오'}
            onClick={() => setOpenChannel(false)}
          ></Button>
        </FlexBox>
        <Text typo={'Body_16'}>{'만들고자 하는 채널의 상세 정보를 입력해주세요'}</Text>
        <Input width={250} ref={channelTitleRef} placeholder={'채널명을 입력해주세요'} />
        <Input width={250} ref={channelDesRef} placeholder={'채널 설명을 입력해주세요'} />
      </FlexBox>
      <Spacing size={60} />
      <Button buttonType={'Large'} value={'채널 생성하기'} onClick={handleCreateChannel}></Button>
    </>
  )
}
export default CreateChannel
