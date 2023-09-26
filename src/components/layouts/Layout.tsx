import styled from '@emotion/styled'
import { Outlet } from 'react-router-dom'

import { useConfirmModal } from '@/libs/hooks/useConfirmModal'
import useModal from '@/libs/hooks/useModal'
import { theme } from '@/styles/theme'

const Layout = () => {
  const { Modal } = useModal()
  const { ModalConfirm } = useConfirmModal()
  return (
    <MainContainer>
      <Outlet />
      <Modal />
      <ModalConfirm />
    </MainContainer>
  )
}
export default Layout

const MainContainer = styled.main`
  position: relative;
  max-width: 480px;
  height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
  background-color: ${theme.palette.BACKGROUND};
`
