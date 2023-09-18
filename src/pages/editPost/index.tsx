import { Route, Routes } from 'react-router-dom'

import AppBarNavTemplate from '@/components/layouts/AppBarNavTemplate'
import EditPostPage from '@/pages/editPost/EditPost'

const EditPostRouter = () => {
  return (
    <Routes>
      <Route
        path={'/'}
        element={
          <AppBarNavTemplate hasNav={false} title={'글 수정하기'}>
            <EditPostPage />
          </AppBarNavTemplate>
        }
      ></Route>
    </Routes>
  )
}

export default EditPostRouter
