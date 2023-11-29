import { useState, useEffect } from "react";
import CrowdFund from "../../contracts/CrowdFund.json";
import Web3 from "web3";


  
function Voting() {
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
  const [out3,setOut3]= useState("");
  

 

  const fetchRequestDetails = async () => {
    const {contract,web3}=state;
  
    
  await contract.methods.voting(out1,out2,out3).send({from:out2});
  
  window.location.reload();

 
  }

  return (
    <div>
      <h2>Vote</h2>
      <div>
        <input
          type="text"
          id="out1"
          required="required"
          value={out1}
          onChange={(e) => setOut1(e.target.value)}
          placeholder="Request No"
        />
      </div>
      <div>
        <input
          type="text"
          id="out2"
          required="required"
          value={out2}
          onChange={(e) => setOut2(e.target.value)}
          placeholder="Your Address"
        />
      </div>
      <div>
        <input
          type="Password"
          id="out3"
          required="required"
          value={out3}
          onChange={(e) => setOut3(e.target.value)}
          placeholder="Password"
        />
      </div>
      <button onClick={fetchRequestDetails} className="button button2">
      Vote
      </button>
     
    </div>
  );
}

export default Voting;