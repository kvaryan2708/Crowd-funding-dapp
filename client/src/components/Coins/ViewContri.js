import { useState, useEffect } from "react";
import CrowdFund from "../../contracts/CrowdFund.json";
import Web3 from "web3";



  
function ViewContri() {
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
  const [out4, setOut4] = useState("");
  const [out5, setOut5] = useState("");
  const [out6,setOut6]= useState("");
  // Other state variables as needed

  const [num, setNum] = useState(""); // State variable for request number

 

  const fetchRequestDetails = async () => {
    const {contract}=state;
  
    const out1=String(await contract.methods.View_des(num).call());
    const out2=Number(await contract.methods.View_total(num).call());
  
    const out3=Number(await contract.methods.View_person(num).call());
    const out4=Number(await contract.methods.View_remaining(num).call());
    const out5=Number(await contract.methods.View_client(num).call());
    const out6=String(await contract.methods.View_status(num).call());
  
   setOut1(out1);setOut2(out2);setOut3(out3);setOut4(out4);setOut5(out5);setOut6(out6);
   const reloadInterval = 3000; 


setTimeout(function() {
  
  window.location.reload();
}, reloadInterval);
 
  }

  return (
    <div>
      <h2>View Request</h2>
      <div>
        <input
          type="text"
          id="num"
          required="required"
          value={num}
          onChange={(e) => setNum(e.target.value)}
          placeholder="Request Number"
        />
      </div>
      <button onClick={fetchRequestDetails} className="button button2">
        View
      </button>
      <p>Desc: {out1}</p>
      <p>total: {out2} </p>
      <p>Per Person: {out3}</p>
      <p>Collected: {out4}</p>
      <p>People Paid: {out5} </p>
      <p>Status: {out6}</p>
    </div>
  );
}

export default ViewContri;