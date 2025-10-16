import { lazy, Suspense, useEffect, useState } from "react"
import "./global.css"
import { Route, Routes } from "react-router"

const Login = lazy(() => import("./pages/Login"))
function App() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return clearInterval(timer)
  }, [])

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
   
          <Routes>
            <Route element={<Login />} path="/"></Route>
          </Routes>
      
      </Suspense>
    </>
  )
}

export default App
