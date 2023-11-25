import { useState, useEffect } from "react";
import CrowdFund from "./contracts/CrowdFund.json";
import Web3 from "web3";
import "./App.css";



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
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");

    async function template() {
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CrowdFund.networks[networkId];
      const contract = new web3.eth.Contract(
        CrowdFund.abi,
        deployedNetwork.address
      );
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      setState({ web3: web3, contract: contract,account: account});
      setManager(account);
    }
    provider && template();
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
  async function createReq(){
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
}


  return (
   
    <div className="App">

    
      <h1>Welcome to CrowdFunding App</h1>
      <p> Manager Address:{manager}</p>
      <p> Balance : {balance}  ether</p>
      <h2>Registration</h2>
      <div>
          <input
            type="text"
            id="ad"
            required="required"
            onChange={(e) => setAd(e.target.value)}
            placeholder="Address"
          />
        </div>

        <div>
          <input
            type="Password"
            id="password1"
            required="required"
            onChange={(e) => setPassword1(e.target.value)}
            placeholder="Set Password"
          />
        </div>
        <button onClick={register}className="button button2">
          Register
        </button>

      <h2>Contribute</h2>
  <div>
          <input
            type="text"
            id="ammount"
            required="required"
            onChange={(e) => setAmmount(e.target.value)}
            placeholder="Amount in Ether"
          />
        </div>

        <div>
          <input
            type="text"
            id="acount"
            required="required"
            onChange={(e) => setAcount(e.target.value)}
            placeholder="Sender's Ethereum Address"
          />
        </div>

        
         
        <button onClick={Sendeth}className="button button2">
          Send Ether
        </button>

        <h3>Find Your Contri</h3>
        <div>
          <input
            type="text"
            id="target"
            required="required"
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Your Ethereum Address"
          />
        </div>
        <div>
          <input
            type="Password"
            id="password2"
            required="required"
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="Password"
          />
        </div>
       
        <button onClick={find}className="button button2">
          Find
        </button>
        <p>Your Contri: {val} ether  </p>

        <h2>Create Request</h2>
        <div>
          <input
            type="text"
            id="data1"
            required="required"
            onChange={(e) => setData1(e.target.value)}
            placeholder=" Desc"
          />
        </div>
        <div>
          <input
            type="text"
            id="data2"
            required="required"
            onChange={(e) => setData2(e.target.value)}
            placeholder=" Eth Ammount"
          />
        </div>
        <div>
          <input
            type="Password"
            id="data3"
            required="required"
            onChange={(e) => setData3(e.target.value)}
            placeholder=" Password"
          />
        </div>
     
        <button onClick={createReq}className="button button2">
          Create
        </button>

        <h2>View Request</h2>

        <div>
          <input
            type="text"
            id="num"
            required="required"
            onChange={(e) => setNum(e.target.value)}
            placeholder=" Req no"
          />
        </div>
        <button onClick={viewReq}className="button button2">
          View
        </button>
        <p>Desc: {out1}</p>
        <p>Money: {out2}</p>
      

        
     

        <h2>Withdrawl</h2>
        
        <div>
          <input
            type="text"
            id="recipient1"
            required="required"
            onChange={(e) => setRecipient1(e.target.value)}
            placeholder=" Ethereum Address"
          />
        </div>
         
        <div>
          <input
            type="text"
            id="withdraw_amnt"
            required="required"
            onChange={(e) => setWithdraw_amnt(e.target.value)}
            placeholder=" Ammount "
          />
        </div>

        <div>
          <input
            type="Password"
            id="password"
            required="required"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>

        <button onClick={withdraw}className="button button2">
          Withdraw
        </button>

    </div>
    
  );
}

export default App;