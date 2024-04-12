import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import './components/login'
import Login from './components/login'
import Guest_panel from './components/guest_panel'

function App() {

  return (
    <>
      <Login/>
      <div>
      
      </div>
      <p className="bg-purple-500">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
