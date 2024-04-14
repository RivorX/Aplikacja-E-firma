import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import router from './router.jsx'
import GuestLayout from './views/GuestLayout.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <GuestLayout />
    </RouterProvider>
  </React.StrictMode>,
)
