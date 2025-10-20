import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom"
import { AuthProvider } from './context/authContext/index.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
    
  </StrictMode>,
  </BrowserRouter>
)
