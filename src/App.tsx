import { Route, Routes } from "react-router-dom"
import FriendsRouter from "@/pages/friends"
import MyProfileRouter from "@/pages/myprofile"
import ChattingRouter from "@/pages/chatting"
import ChannelsRouter from "@/pages/channels"
import RegisterRouter from "@/pages/register"
import LoginPage from "@/pages/login"
import Layout from "@/components/layouts/Layout"

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<ChannelsRouter />} />
        <Route path="/friends" element={<FriendsRouter />}></Route>
        <Route path="/profile" element={<MyProfileRouter />}></Route>
        <Route path="/chatting" element={<ChattingRouter />}></Route>
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterRouter />} />
      <Route path="/example" element={<Example />} />
    </Routes>
  )
}

export default App
