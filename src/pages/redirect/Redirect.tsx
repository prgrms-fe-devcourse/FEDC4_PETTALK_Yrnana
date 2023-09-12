import { Navigate } from 'react-router-dom'

const RedirectPage = () => {
  //여기서 로그인 여부를 boolean으로 받아 확인
  //   -> localStorage, jotai Store중 어디에 로그인 여부를 저장할지 고민
  const isLogin = localStorage.getItem('loginState')

  return <div>{!isLogin && <Navigate to={'/login'}></Navigate>}</div>
}

export default RedirectPage
