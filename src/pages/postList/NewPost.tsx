import styled from '@emotion/styled'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import { theme } from '@/styles/theme'

const NewPostPage = () => {
  const navigate = useNavigate()
  const channelID = useLocation().pathname.split('/')[1]
  const [title, setTitle] = useState<string | undefined>('')
  return (
    <NewPostContainer>
      <form>
        <input
          placeholder={'제목을 입력해주세요'}
          value={title ? title : ''}
          onChange={(e: { target: { value: string } }) => setTitle(e.target.value)}
        />
      </form>
    </NewPostContainer>
  )
}

export default NewPostPage

const NewPostContainer = styled.div`
  border-radius: 10px 10px 0px 0px;
  background-color: ${theme.palette.GRAY100};
  width: 100%;
  padding-top: 20px;
  height: 100%;
`
