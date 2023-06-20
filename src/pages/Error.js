import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/sidebar'

const Error = () => {
  return (
    <div>
      <Header/>
      <Sidebar/>
      <div title="404" className='errorpage'>404</div>
    </div>
  )
}

export default Error
