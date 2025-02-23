import { useState } from 'react'
import './style.css'
import Header from './Header'
// import Sidebar from './sidebar'
import Home from './Home'

function Apps() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar}/>
      {/* <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/> */}
      <Home />
    </div>
  )
}

export default Apps