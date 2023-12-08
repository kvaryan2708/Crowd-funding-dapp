import React from 'react'
import { Link ,Outlet} from 'react-router-dom'

const Director = () => {
  return (
    <div>
        <Link to="Sendpoints">Send Money</Link>&nbsp;&nbsp;&nbsp;
        <Link to="Contri_req">Contri Req</Link>
        <Outlet/>
    </div>
  )
}

export default Director