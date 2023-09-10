import styled from '@emotion/styled'
import { typo } from '@/styles/typo'
import { useLocation, useNavigate } from 'react-router-dom'
import { palette } from '@/styles/palette'
import { useEffect, useState } from 'react'

const NavigationBar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [clickMenu, setClickMenu] = useState<string | undefined>()
  useEffect(() => {
    setClickMenu(location.pathname.slice(1))
  }, [location])
  const moveFromNavigationBar = (path: string) => {
    navigate(`/${path}`)
  }
  return (
    <>
      <StyleWrapper>
        <StyleNavigation>
          <StyleNavigationItem onClick={() => moveFromNavigationBar('chatting')}>
            {/* 추후 StyleIcon 위치에 해당 아이콘 넣을 예정입니다. */}
            <StyleIcon clickMenu={clickMenu == 'chatting'}></StyleIcon>
            <StyleNavigationText>채팅목록</StyleNavigationText>
          </StyleNavigationItem>
          <StyleNavigationItem onClick={() => moveFromNavigationBar('')}>
            <StyleIcon clickMenu={clickMenu == ''}></StyleIcon>
            <StyleNavigationText>채널탐색</StyleNavigationText>
          </StyleNavigationItem>
          <StyleNavigationItem onClick={() => moveFromNavigationBar('friends')}>
            <StyleIcon clickMenu={clickMenu == 'friends'}></StyleIcon>
            <StyleNavigationText>팔로우목록</StyleNavigationText>
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

const StyleNavigationText = styled.span`
  font-size: ${typo.Caption_9};
`
const StyleIcon = styled.span<{ clickMenu: boolean }>`
  width: 34px;
  height: 34px;
  background-color: ${({ clickMenu }) => (clickMenu ? `${palette.CORAL}` : '')};
  border-radius: 50px;
`
export default NavigationBar
