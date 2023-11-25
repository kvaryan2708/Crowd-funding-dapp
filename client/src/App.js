/*This is my frontend code connected to smart contract by web3
All the imported functions are included in separate files*/

import { useState, useEffect } from "react";
import CrowdFund from "./contracts/CrowdFund.json";
import Web3 from "web3";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateReq from "./CreateReq";
import ViewReq from "./ViewReq";
import Sendeth from "./Sendeth";
import Find from "./Find";
import Register from "./Register";
import Navbar from "./Navbar";
import Voting from "./Voting";
import Withdraw from "./Withdraw"

function App() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
   account: null,
  });
  
  const [manager ,setManager]=useState();
  const [balance,setBalance]=useState();

  
useEffect(() => {
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
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      setState({ web3, contract, account });
      setManager(account);
      console.log(manager);
    } else {
      console.log("MetaMask is not installed. Please install it.");
    }
  }

  loadWeb3();
}, []);

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

    
      <h1>Welcome to CrowdFunding App</h1>
      <p> Manager Address:{manager}</p>
      <p> Balance : {balance}  ether</p>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/Sendeth' element={<Sendeth/>}/>
          <Route exact path='/Register' element={<Register/>}/>
          <Route exact path='/Find' element={<Find/>}/>
          <Route exact path='/ViewReq' element={<ViewReq/>}/>
          <Route exact path='/CreateReq' element={<CreateReq/>}/>
          <Route exact path='/Voting' element={<Voting/>}/>
          <Route exact path='/Withdraw' element={<Withdraw/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;