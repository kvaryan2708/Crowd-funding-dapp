import { useState, useEffect } from "react";
import CrowdFund from "../../contracts/CrowdFund.json";
import Web3 from "web3";


function MyAccount() {
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

  const [out1, setOut1] = useState("");
  const [out2, setOut2] = useState("");
  
  // Other state variables as needed

  const [num, setNum] = useState(""); // State variable for request number
  const  [pass,setPass]=useState("");
 

  const fetchRequestDetails = async () => {
    const {contract}=state;
  
    const out1=String(await contract.methods.Profile_name(num,pass).call());
    const out2=Number(await contract.methods.Profile_points(num,pass).call());
  
  
   setOut1(out1);setOut2(out2);
   const reloadInterval = 3000; 


setTimeout(function() {
  
  window.location.reload();
}, reloadInterval);
 
  }

  return (
    <div>
      <h2>View Account</h2>
      <div>
        <input
          type="text"
          id="num"
          required="required"
          value={num}
          onChange={(e) => setNum(e.target.value)}
          placeholder="Address"
        />
      </div>
      <div>
        <input
          type="Password"
          id="pass"
          required="required"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
        />
      </div>
      <button onClick={fetchRequestDetails} className="button button2">
        View
      </button>
      <p>Name: {out1}</p>
      <p>Money: {out2} </p>
      
    </div>
  );
}

export default MyAccount;