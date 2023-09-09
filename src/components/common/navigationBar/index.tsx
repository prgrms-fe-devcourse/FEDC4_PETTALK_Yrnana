import styled from '@emotion/styled'
import { typo } from '@/styles/typo'
import { useNavigate } from 'react-router-dom'
import { palette } from '@/styles/palette'
import { useLocation } from 'react-router-dom'

const NavigationBar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  let currentPage = ''
  const moveFromNavigationBar = (path: string) => {
    navigate(`/${path}`)
  }
  return (
    <>
      <StyleWrapper>
        <StyleNavigation>
          <StyleNavigationItem onClick={() => moveFromNavigationBar('chatting')}>
            <StyleIcon></StyleIcon>
            <NavigationText>채팅목록</NavigationText>
          </StyleNavigationItem>
          <StyleNavigationItem onClick={() => moveFromNavigationBar('')}>
            <StyleIcon></StyleIcon>
            <NavigationText>채널탐색</NavigationText>
          </StyleNavigationItem>
          <StyleNavigationItem onClick={() => moveFromNavigationBar('friends')}>
            <StyleIcon></StyleIcon>
            <NavigationText>팔로우목록</NavigationText>
          </StyleNavigationItem>
        </StyleNavigation>
      </StyleWrapper>
    </>
  )
}
const StyleWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const StyleNavigation = styled.div`
  width: 225px;
  height: 59px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 30px;
  border: 1px solid grey;
  padding-left: 15px;
  padding-right: 15px;
  box-shadow: 2px 3px 5px 1px black;
`
const StyleNavigationItem = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const NavigationText = styled.span`
  font-size: ${typo.Caption_9};
`
const StyleIcon = styled.span`
  width: 34px;
  height: 34px;
  background-color: ${palette.CORAL};
  border-radius: 50px;
`
export default NavigationBar
