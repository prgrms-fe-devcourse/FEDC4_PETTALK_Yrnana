import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Chat from '@/assets/icons/Chat'
import Follow from '@/assets/icons/Follow'
import Shop from '@/assets/icons/Shop'
import { FlexBox } from '@/components/common/flexBox'
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
    <StyleWrapper fullWidth={true}>
      <StyleNavigation justify={'space-around'}>
        <StyleNavigationItem onClick={() => moveFromNavigationBar('chattinglist')}>
          <FlexBox direction={'column'} gap={5}>
            <StyleIcon clickMenu={clickMenu == 'chattinglist'}>
              <Chat />
            </StyleIcon>
            <StyleNavigationText>{'채팅목록'}</StyleNavigationText>
          </FlexBox>
        </StyleNavigationItem>
        <StyleNavigationItem onClick={() => moveFromNavigationBar('')}>
          <FlexBox direction={'column'} gap={5}>
            <StyleIcon clickMenu={clickMenu == ''}>
              <Shop />
            </StyleIcon>
            <StyleNavigationText>{'채널탐색'}</StyleNavigationText>
          </FlexBox>
        </StyleNavigationItem>
        <StyleNavigationItem onClick={() => moveFromNavigationBar('friends')}>
          <FlexBox direction={'column'} gap={5}>
            <StyleIcon clickMenu={clickMenu == 'friends'}>
              <Follow height={25} />
            </StyleIcon>
            <StyleNavigationText>{'팔로우목록'}</StyleNavigationText>
          </FlexBox>
        </StyleNavigationItem>
      </StyleNavigation>
    </StyleWrapper>
  )
}
const StyleWrapper = styled(FlexBox)`
  position: absolute;
  bottom: 30px;
`

const StyleNavigation = styled(FlexBox)`
  width: 225px;
  height: 59px;
  background-color: white;
  border-radius: 30px;
  padding: 0 15px;
  box-shadow:
    0px 0px 2px 0px rgba(0, 0, 0, 0.24),
    0px 4px 4px 0px rgba(0, 0, 0, 0.14);
`

const StyleNavigationItem = styled.button``

const StyleNavigationText = styled.span`
  font-size: ${typo.Caption_9};
`

const StyleIcon = styled(FlexBox)<{ clickMenu: boolean }>`
  width: 32px;
  height: 32px;
  background-color: ${({ clickMenu }) => (clickMenu ? `${palette.CORAL}` : '')};
  border-radius: 50px;
`
export default NavigationBar
