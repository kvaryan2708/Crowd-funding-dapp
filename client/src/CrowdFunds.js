import React from 'react'
import { Link,Outlet } from 'react-router-dom'

const CrowdFunds = () => {
  return (
    <div>
       <Link to="CreateReq" >Create</Link>&nbsp;&nbsp;&nbsp;
        <Link to="ViewReq" >View</Link>&nbsp;&nbsp;&nbsp;
        <Link to="Find" >Find</Link>&nbsp;&nbsp;&nbsp;
        <Link to="Register" >Register</Link>&nbsp;&nbsp;&nbsp;
        <Link to="Sendeth" >Send</Link>&nbsp;&nbsp;&nbsp;
        <Link to="Voting" >Vote</Link>&nbsp;&nbsp;&nbsp;
        <Link to="Withdraw" >Withdraw</Link>&nbsp;&nbsp;&nbsp; 
        <Outlet/>
    </div>
  )
}

export default CrowdFunds