import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.jsx'
import AuthContextProvider from './context/AuthContext.jsx'
import './index.css'
import StoreContextProvider from './context/StoreContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <StoreContextProvider>
          <ToastContainer position='top-center' />
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </StoreContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
