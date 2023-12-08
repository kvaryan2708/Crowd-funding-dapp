import React from 'react'
import { Link ,Outlet} from 'react-router-dom'

const Contri = () => {
  return (
    <div>
        <Link to="Signup" >Signup</Link>&nbsp;&nbsp;&nbsp;
        <Link to="MyAccount" >My Account</Link>&nbsp;&nbsp;&nbsp;
        
        
        <Link to="ViewContri" >View Contri</Link>&nbsp;&nbsp;&nbsp;
        <Link to="Pay" >Pay </Link>&nbsp;&nbsp;&nbsp;
        <Link to="ViewPayee" >ViewPayee </Link>&nbsp;&nbsp;&nbsp;
        <Outlet/>
    </div>
  )
}

export default Contri