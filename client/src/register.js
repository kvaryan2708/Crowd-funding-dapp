import { useState, useEffect } from "react";
import CrowdFund from "./contracts/CrowdFund.json";
import Web3 from "web3";
import "./App.css";


  

function Register() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
   account: null,
  });

  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

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

  

  const handleRegistration = async () => {
    const {contract}=state;
    
   

    await contract.methods.register(address,password).send({from: address});
    window.location.reload();
  };

  return (
    <div>
      <h2>Registration</h2>
      <div>
        <input
          type="text"
          id="address"
          required="required"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Ethereum Address"
        />
      </div>
      <div>
        <input
          type="password"
          id="password"
          required="required"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Set Password"
        />
      </div>
      <button onClick={handleRegistration} className="button button2">
        Register
      </button>
    </div>
  );
}

export default Register;