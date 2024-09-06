import React from 'react'
import { Outlet } from 'react-router-dom'
function Root() {
  return (
    <div className='bg-gray'>
        <Outlet/>
    </div>
  )
}

export default Root