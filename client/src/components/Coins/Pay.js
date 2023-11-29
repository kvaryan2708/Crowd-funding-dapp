import { useState, useEffect } from "react";
import CrowdFund from "../../contracts/CrowdFund.json";
import Web3 from "web3";


function Pay() {
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
  const [address,setAddress]=useState("");
  const [password, setPassword] = useState("");
 

  const handlefind = async () => {
    const {contract,account,web3}=state;
 ;

    
  
      await contract.methods.Pay(id,address,password).send({ from: account,gas:210000});
  
  
     window.location.reload();
  
  
}  
   
   

  return (
    <div>
      <h2>Pay</h2>
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
          id="address"
          required="required"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
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
       Pay
      </button>
      
    </div>
  );
}

export default Pay;