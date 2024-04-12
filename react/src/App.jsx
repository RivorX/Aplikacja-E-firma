import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import './components/LoginPanel'
import Login from './components/LoginPanel'
import Guestpanel from './components/GuestPanel'

function App() {

  return (
    <>
      
      <div>
        <Guestpanel />
      </div>
      <main className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              {/* tu wyświetlały się rzeczy na głównej, na środku */}
          </div>
      </main>
      <footer className="py-4 text-center text-sm text-white dark:text-White/70 bg-gray-500 w-full">
          E-firma
      </footer>
    </>
  )
}

export default App
