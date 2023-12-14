import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Director = () => {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const checkPassword = () => {
    // Replace 'your_password' with the actual password you want to set
    if (password === '335566') {
      setAuthenticated(true);
    } else {
      alert('Incorrect password. Please try again.');
    }
  };

  return (
    <div>
      {!authenticated ? (
        <div>
          <label htmlFor="password">Enter Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={checkPassword}>Submit</button>
        </div>
      ) : (
        <div>
          <h1>Welcome Director!</h1>
          <Link to="Withdraw" >Withdraw</Link>&nbsp;&nbsp;&nbsp; 
       <Link to="CreateReq" >Create</Link>&nbsp;&nbsp;&nbsp;
          <Link to="Sendpoints">Send Money</Link>&nbsp;&nbsp;&nbsp;
          <Link to="Contri_req">Contri Req</Link>
          <Outlet />
        </div>
      )}
    </div>
  );
};

export default Director;