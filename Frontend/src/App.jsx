import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GoogleLogin from './Login'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <GoogleLogin/>
    </>
  )
}

export default App
