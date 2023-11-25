import { useState, useEffect } from "react";
import CrowdFund from "./contracts/CrowdFund.json";
import Web3 from "web3";
import "./App.css";

function Find() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
   account: null,
  });

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
       
      } else {
        console.log("MetaMask is not installed. Please install it.");
      }
    }

    loadWeb3();
  }, []);

  const [target, setTarget] = useState("");
  const [password, setPassword] = useState("");
  const [val, setVal] = useState(0); // This will store the contribution amount

  const handlefind = async () => {
    const {contract}=state;

    const value =Number(await contract.methods.Find(target,password).call());
    const val=value/1000000000000000000;
  
    //console.log(val);
   
  
    setVal(val);
    const reloadInterval = 3000; 


    setTimeout(function() {
      
      window.location.reload();
    }, reloadInterval);
     
  };

  return (
    <div>
      <h2>Find Your Contribution</h2>
      <div>
        <input
          type="text"
          id="target"
          required="required"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="Your Ethereum Address"
        />
      </div>
      <div>
        <input
          type="password"
          id="password"
          required="required"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <button onClick={handlefind} className="button button2">
        Find
      </button>
      <p>Your Contribution: {val} ether</p>
    </div>
  );
}

export default Find;