import React from 'react'
import { Link,Outlet } from 'react-router-dom';

const Coins = () => {
  return (
    <>
    <h2>coins</h2>
    <div>
      <li>
        <Link to={"/Coins/MyAccount"}> Myaccount</Link>
      </li>

      <li>
        <Link to={"/Coins/Pay"}> Pay</Link>
      </li>

      <li>
        <Link to={"/Coins/Register"}> Register</Link>
      </li>

      <li>
        <Link to={"/Coins/Sendpoints"}> sendpoints</Link>
      </li>

      <li>
        <Link to={"/Coins/Signup"}> Signup</Link>
      </li>

      <li>
        <Link to={"/Coins/ViewContri"}> ViewContri</Link>
      </li>

      <li>
        <Link to={"/Coins/ViewPayee"}> ViewPayee</Link>
      </li>
      <Outlet/>
    </div>
    </>
  )
}

export default Coins