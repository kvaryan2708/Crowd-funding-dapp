import React from 'react'
import "./App.css"

import { Link } from 'react-router-dom';
function Navbar(){
    return(
        <>
        <Link to="/CreateReq" >Create</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/ViewReq" >View</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/Find" >Find</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/Register" >Register</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/Sendeth" >Send</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/Voting" >Vote</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/Withdraw" >Withdraw</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/Signup" >Signup</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/MyAccount" >My Account</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/Sendpoints" >Send Money(manager)</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/Contri_req" >Contri Req</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/ViewContri" >View Contri</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/Pay" >Pay </Link>&nbsp;&nbsp;&nbsp;
        <Link to="/ViewPayee" >ViewPayee </Link>&nbsp;&nbsp;&nbsp;
        </>
    );
}

export default Navbar;