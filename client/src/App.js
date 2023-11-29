import { useState, useEffect } from "react";
import CrowdFund from "./contracts/CrowdFund.json";
import Web3 from "web3";
import "./App.css";

import { BrowserRouter as Router, Route, Routes,Link } from "react-router-dom";
import Home from "./pages/Home";
import CrowdFunding from "./pages/CrowdFunding";
import Coins from "./pages/Coins";
import CreateReq from "./components/CrowdFunding/CreateReq";
import Contri_req from "./components/CrowdFunding/Contri_req";
import ViewReq from "./components/CrowdFunding/ViewReq";
import Sendeth from "./components/CrowdFunding/Sendeth";
import Find from "./components/CrowdFunding/Find";
import Voting from "./components/CrowdFunding/Voting";

import MyAccount from "./components/Coins/MyAccount";
import Pay from "./components/Coins/Pay";
import Register from "./components/Coins/Register";
import Sendpoints from "./components/Coins/Sendpoints";
import Signup from "./components/Coins/Signup";
import ViewContri from "./components/Coins/ViewContri";
import ViewPayee from "./components/Coins/ViewPayee";
import { Header } from "./components/Header";

function App() {
  const web3 = new Web3(window.ethereum);
  const [state, setState] = useState({
    web3: null,
    contract: null,
   account: null,
  });
  
  const [manager ,setManager]=useState();
  const [balance,setBalance]=useState();
  const [connectedAcc,setconnectedAcc]=useState(null);

  async function getAccount() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      .catch((err) => {
        if (err.code === 4001) {
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });
      const account = accounts[0];
      setconnectedAcc(account);
      console.log(accounts);
  }

  async function loadWeb3() {
    if (window.ethereum) {
      await window.ethereum.enable();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CrowdFund.networks[networkId];
      const contract = new web3.eth.Contract(
        CrowdFund.abi,
        deployedNetwork.address
      );
     
      const account = "0xd377254722D3274f66eB66c392925F6052335CcB";
      setState({ web3, contract, account });
      getAccount();
    } else {
      console.log("MetaMask is not installed. Please install it.");
    }
  }

  useEffect(()=>{
    getAccount()
  },[]);

  return (
    <div className="App">
      <Header/>
      <h1>Hey welcome to this!!</h1>
      <p> Hii {connectedAcc}</p>
      <button onClick={loadWeb3} disabled={connectedAcc}> {connectedAcc ? "connected" : "connect to wallet"}</button>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/CrowdFunding" element={<CrowdFunding/>}>
              <Route path="CreateReq" element={<CreateReq/>}/>
              <Route path="Contribute" element={<Contri_req/>}/>
              <Route path="ViewReq" element={<ViewReq/>}/>
              <Route path="SendEth" element={<Sendeth/>}/>
              <Route path="Find" element={<Find/>}/>
              <Route path="Voting" element={<Voting/>}/>
          </Route>

          <Route exact path="/Coins" element={<Coins/>}>
          <Route path="CreateReq" element={<CreateReq/>}/>
              <Route path="MyAccount" element={<MyAccount/>}/>
              <Route path="Pay" element={<Pay/>}/>
              <Route path="Register" element={<Register/>}/>
              <Route path="Sendpoints" element={<Sendpoints/>}/>
              <Route path="Signup" element={<Signup/>}/>
              <Route path="ViewContri" element={<ViewContri/>}/>
              <Route path="ViewPayee" element={<ViewPayee/>}/>
          </Route>

        </Routes>
      </Router>
      
    </div>
  );
}

export default App;