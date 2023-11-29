import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
    
    <h2>home</h2>
    <div>
      <li>
        <Link to={"/"}> Home</Link>
      </li>

      <li>
        <Link to={"/CrowdFunding"}> CrowdFunding</Link>
      </li>

      <li>
        <Link to={"/Coins"}> Coins</Link>
      </li>
    </div>
    
    </>
  )
}

export default Home