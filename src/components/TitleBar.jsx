import React from 'react'
import { Link } from 'react-router-dom'

const TitleBar = () => {
 
  return (
    <div className='title-bar'>
        <h1>WHOO.</h1>
        <ul>
          <li><Link to={'/home'}>Home</Link></li>
          <li><Link to={'/cart'}>Cart</Link></li>
          <li><Link to={'/orders'}>Orders</Link></li>
        </ul>
    </div>
  )
}

export default TitleBar