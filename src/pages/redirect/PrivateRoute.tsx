import { Navigate, Outlet } from 'react-router-dom'
type PrivateRouteProps = {
  auth: boolean
}

const PrivateRoute = ({ auth }: PrivateRouteProps) => {
  const isLogined = localStorage.getItem('loginState')

  if (auth) {
    return isLogined === null || isLogined == 'false' ? <Navigate to={'/login'} /> : <Outlet />
  } else {
    return isLogined === null || isLogined == 'false' ? <Outlet /> : <Navigate to={'/'} />
  }
}

export default PrivateRoute
