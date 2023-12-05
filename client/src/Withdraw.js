import { useState, useEffect } from "react";
import CrowdFund from "./contracts/CrowdFund.json";
import Web3 from "web3";
import "./App.css";

function Withdraw() {
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
       //const accounts = await web3.eth.getAccounts();
       const account = "0xd377254722D3274f66eB66c392925F6052335CcB";
        setState({ web3, contract, account });
       
      } else {
        console.log("MetaMask is not installed. Please install it.");
      }
    }

    loadWeb3();
  }, []);


  const [id, setId] = useState("");
  const [ammount,setAmmount]=useState("");
  const [address,setAddress]=useState("");
  const [password, setPassword] = useState("");
 

  const handlefind = async () => {
    const {contract,account,web3}=state;
    const value = web3.utils.toWei(ammount, "ether");

    
  
      await contract.methods.Withdraw(id,address,password).send({ from: account, value: value });
  
  
     window.location.reload();
  
  
}  
   
   

  return (
    <div>
      <h2>Withdrawl</h2>
      <div>
        <input
          type="text"
          id="id"
          required="required"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Request No"
        />
      </div>
      <div>
        <input
          type="text"
          id="ammount"
          required="required"
          value={ammount}
          onChange={(e) => setAmmount(e.target.value)}
          placeholder="Ammount"
        />
      </div>
      <div>
        <input
          type="text"
          id="address"
          required="required"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Recipient Address"
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
       Withdraw
      </button>
      
    </div>
  );
}

export default Withdraw;