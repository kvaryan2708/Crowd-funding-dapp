/*This is my frontend code connected to smart contract by web3
All the imported functions are included in separate files*/

import { useState, useEffect } from "react";
import CrowdFund from "./contracts/CrowdFund.json";
import Web3 from "web3";
import "./App.css";

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Director from "./Director"
import CrowdFunds from "./CrowdFunds"
import Contri from "./Contri"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreateReq from "./CreateReq";
import ViewReq from "./ViewReq";
import Sendeth from "./Sendeth";
import Find from "./Find";
import Register from "./Register";


import Voting from "./Voting";
import Withdraw from "./Withdraw"
import Signup from "./Signup"
import MyAccount from "./MyAccount"
import Sendpoints from "./Sendpoints"
import Contri_req from "./Contri_req"
import ViewContri from "./ViewContri"
import Pay from "./Pay"
import ViewPayee from "./ViewPayee"
function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
   account: null,
  });
  
  const [manager ,setManager]=useState();
  const [balance,setBalance]=useState();
  const [connectedAcc,setConnectedAcc]=useState();
  

  async function loadWeb3() {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CrowdFund.networks[networkId];
      const contract = new web3.eth.Contract(
        CrowdFund.abi,
        deployedNetwork.address
      );
      //const accounts = await web3.eth.getAccounts();
      const account = "0xd377254722D3274f66eB66c392925F6052335CcB";
      setState({ web3, contract, account });
      setConnectedAcc(account);
      setManager(account);
      console.log(manager);
    } else {
      console.log("MetaMask is not installed. Please install it.");
    }
  }




  useEffect(()=>{
    const {contract}=state;
    async function getbalance(){
       const balnce= Number(await contract.methods.getBalance().call());
       const balance=balnce/1000000000000000000;
        setBalance(balance);
        console.log(balance);
    }
    contract && getbalance();
  },[state]);



  return (
    
    <div className="App">
   
      
   <li></li>
   <li></li>
      <h1>Welcome to CrowdFunding App</h1>
      <p> Manager Address:{manager}</p>
      <p> Balance : {balance}  ether</p>
      <button onClick={loadWeb3} disabled={connectedAcc}> {connectedAcc ? "connected" : "connect to wallet"}</button>
      <Router>
       
        <Navbar bg="dark"  className="bg-body-tertiary" fixed="top">
      <Container>
        <Navbar.Brand href="#home">CrowdFunding</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="CrowdFunds">CrowdFunds</Nav.Link>
            <Nav.Link as={Link} to="Contri">Contri</Nav.Link>
            <Nav.Link as={Link} to="Director">Director</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

        <Routes>
          <Route exact path="CrowdFunds" element={<CrowdFunds/>}>
          <Route exact path="Sendeth" element={<Sendeth/>}/>
          <Route exact path="Register" element={<Register/>}/>
          <Route exact path="Find" element={<Find/>}/>
          <Route exact path="ViewReq" element={<ViewReq/>}/>
          
          <Route exact path="Voting" element={<Voting/>}/>
        
          </Route>
          <Route exact path="Contri" element={<Contri/>}>
          <Route exact path="Signup" element={<Signup/>}/>
          <Route exact path="MyAccount" element={<MyAccount/>}/>
         
          <Route exact path="ViewContri" element={<ViewContri/>}/>
          <Route exact path="Pay" element={<Pay/>}/>
          <Route exact path="ViewPayee" element={<ViewPayee/>}/>
          </Route>
          <Route exact path="Director" element={<Director/>}>
          <Route exact path="Sendpoints" element={<Sendpoints/>}/>
          <Route exact path="Contri_req" element={<Contri_req/>}/>
          <Route exact path="Withdraw" element={<Withdraw/>}/>
          <Route exact path="CreateReq" element={<CreateReq/>}/>
          </Route>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;