import React from 'react';
import { Link,Outlet } from 'react-router-dom';


const CrowdFunding = () => {
  return (
    <>
      <h1>CrowdFunding page</h1>
      <div>
      <li>
        <Link to={"/CrowdFunding/CreateReq"}> CreateReq</Link>
      </li>

      <li>
        <Link to={"/CrowdFunding/Contribute"}> Contribute</Link>
      </li>

      <li>
        <Link to={"/CrowdFunding/ViewReq"}> ViewRequest</Link>
      </li>

      <li>
        <Link to={"/CrowdFunding/SendEth"}> SendEth</Link>
      </li>

      <li>
        <Link to={"/CrowdFunding/Find"}> Find</Link>
      </li>

      <li>
        <Link to={"/CrowdFunding/Voting"}> Voting</Link>
      </li>
      <Outlet/>
    </div>
    </>
  );
};

export default CrowdFunding;
