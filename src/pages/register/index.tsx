import { Routes, Route } from "react-router-dom"
import Register from "@/pages/register/Register"
const RegisterRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />}> </Route>
    </Routes>
  )
}


export default RegisterRouter