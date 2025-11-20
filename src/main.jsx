import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import router from './routes/Router.jsx'
import MyProvider from './provider/MyProvider.jsx'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
    <MyProvider>
       <RouterProvider router={router}></RouterProvider>
    </MyProvider>
    </HelmetProvider>
  </StrictMode>,
);
