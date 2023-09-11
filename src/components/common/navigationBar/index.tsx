import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { palette } from '@/styles/palette'
import { typo } from '@/styles/typo'

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
    <StyleWrapper>
      <StyleNavigation>
        <StyleNavigationItem onClick={() => moveFromNavigationBar('chatting')}>
          {/* 추후 StyleIcon 위치에 해당 아이콘 넣을 예정입니다. */}
          <StyleIcon clickMenu={clickMenu == 'chatting'}></StyleIcon>
          <StyleNavigationText>{'채팅목록'}</StyleNavigationText>
        </StyleNavigationItem>
        <StyleNavigationItem onClick={() => moveFromNavigationBar('')}>
          <StyleIcon clickMenu={clickMenu == ''}></StyleIcon>
          <StyleNavigationText>{'채널탐색'}</StyleNavigationText>
        </StyleNavigationItem>
        <StyleNavigationItem onClick={() => moveFromNavigationBar('friends')}>
          <StyleIcon clickMenu={clickMenu == 'friends'}></StyleIcon>
          <StyleNavigationText>{'팔로우목록'}</StyleNavigationText>
        </StyleNavigationItem>
      </StyleNavigation>
    </StyleWrapper>
  )
}
const StyleWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 30px;
  width: 100%;
  margin: auto 0;
`
const StyleNavigation = styled.div`
  width: 225px;
  height: 59px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 30px;
  padding-left: 15px;
  padding-right: 15px;
  box-shadow:
    0px 0px 2px 0px rgba(0, 0, 0, 0.24),
    0px 4px 4px 0px rgba(0, 0, 0, 0.14);
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
