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
  const [str,setStr]=useState("");
  const [manager ,setManager]=useState();
  const [acount,setAcount] =useState();
  const [ammount,setAmmount]=useState();
  const [balance,setBalance]=useState(0);
  const [val,setVal]=useState(0);
  const [target,setTarget]=useState();
  
  const [withdraw_amnt,setWithdraw_amnt]=useState();
  const [password,setPassword]=useState();
  const [ad,setAd]=useState();
  const [password1,setPassword1]=useState();
  const [recipient1,setRecipient1]=useState();
  
  const [password2,setPassword2]=useState();

  const [des,setDes]=useState("nil");
  const [money,setMoney]=useState(0);
  const [password3,setPassword3]=useState();

  const [status,setStatus]=useState();
  const [id,setId]=useState();
  const [des1,setDes1]=useState("nil");
  const [money1,setMoney1]=useState(0);

  const [data1,setData1]=useState("");
const [data2,setData2]=useState(0);
const [data3,setData3]=useState();

const [out1,setOut1]=useState("");
const [out2,setOut2]=useState(0);
const [out3,setOut3]=useState("");
const [num,setNum]=useState();
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
 /* async function createReq(){
    const {contract,web3,account}=state;
    
  
    await contract.methods.createRequest(data1,data2,data3).send({from:account});
    window.location.reload();
  }
  
  async function viewReq(){
    const {contract}=state;
  
    const out1=String(await contract.methods.viewD(num).call());
    const out2=Number(await contract.methods.viewM(num).call());
   // const out3=String(await contract.methods.viewS(num).call());
  
   setOut1(out1);setOut2(out2);//setOut3(out3);
  
   const refreshInterval = 3000; // 5 minutes
   const timerId = setTimeout(() => {
     window.location.reload();
   }, refreshInterval);
  
   // Clear the timer when the component unmounts (cleanup)
   return () => clearTimeout(timerId);
  }
  async function Sendeth() {
    const { contract,account,web3 } = state;
    const value = web3.utils.toWei(ammount, "ether");

    try {
 
    await contract.methods.SendEth(account).send({ from: acount, value: value });
     
  
     window.location.reload();
  }catch (error) {
    console.error("Error sending Ether:", error);
  }
}

async function find(){
  const {contract}=state;

  const value =Number(await contract.methods.Find(target,password2).call());
  const val=value/1000000000000000000;

  //console.log(val);
 

  setVal(val);
 
  window.location.reload();
}
async function register(){
  const {contract}=state;

  await contract.methods.register(ad,password1).send({from: ad});
  window.location.reload();
}




async function withdraw() {
  const { contract,account,web3 } = state;
  const value = web3.utils.toWei(withdraw_amnt, "ether");

  try {

    await contract.methods.Withdraw(recipient1,password).send({ from: manager, value: value });


   window.location.reload();
}catch (error) {
  console.error("Error withdrawing Ether:", error);
}
}*/


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