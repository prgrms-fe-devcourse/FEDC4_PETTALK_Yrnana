import { Route, Routes } from "react-router-dom"
import FriendsRouter from "@/pages/friends"
import MyProfileRouter from "@/pages/myprofile"
import ChattingRouter from "@/pages/chatting"
import ChannelsRouter from "@/pages/channels"
import LoginPage from "@/pages/login"
import RegisterRouter from "@/pages/register"

function App() {

  return (
    <Routes>
      <Route element={ }>
        <Route path="/" element={<ChannelsRouter />} />
        <Route path="/friends" element={<FriendsRouter />}></Route>
        <Route path="/profile" element={<MyProfileRouter />}></Route>
        <Route path="/chatting" element={<ChattingRouter />}></Route>
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterRouter />} />
    </Routes>
  )
}

export default App
