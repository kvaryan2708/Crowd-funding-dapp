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
        </>
    );
}

export default Navbar;