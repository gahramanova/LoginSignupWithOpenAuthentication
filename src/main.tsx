import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom"
import { AuthProvider } from './context/authContext/index.tsx'
import { SocketProvider } from './context/socketContext/index.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <StrictMode>
    <AuthProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </AuthProvider>
    
  </StrictMode>,
  </BrowserRouter>
)
