import { lazy, Suspense, useEffect, useState } from "react"
import "./global.css"
import { Route, Routes } from "react-router"

const Login = lazy(() => import("./pages/Login"))
const Header = lazy(() => import("./layout/Header"))
const Home = lazy(() => import("./pages/Home"))
const Register = lazy(() => import("./pages/Register"))
const ChatWindow = lazy(() => import("./pages/ChatWindow"))
function App() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return clearInterval(timer)
  }, [])

  return (
    <>
    <Header/>
      <Suspense fallback={<div>Loading...</div>}>
   
          <Routes>
            <Route element={<Home />} path="/"></Route>
            <Route element={<Login />} path="/login"></Route>
            <Route element={<Register />} path="/register"></Route>
            <Route element={<ChatWindow />} path="/chatwindow"></Route>

          </Routes>
      
      </Suspense>
    </>
  )
}

export default App
