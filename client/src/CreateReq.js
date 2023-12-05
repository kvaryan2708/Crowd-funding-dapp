import { useState, useEffect } from "react";
import CrowdFund from "./contracts/CrowdFund.json";
import Web3 from "web3";
import "./App.css";


  

function CreateReq() {
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

  const [data1, setData1] = useState("");
  const [data2, setData2] = useState("");
  const [data3, setData3] = useState("");
  // Other state variables as needed

  const handlecreateReq = async () => {
    const {contract,web3,account}=state;
    const value = web3.utils.toWei(data2, "ether");
  
    await contract.methods.createRequest(data1,value,data3).send({from:account,gas:210000});
  
      
    
    window.location.reload();
  };

  return (
    <div>
      <h2>Create Request</h2>
      <div>
        <input
          type="text"
          id="data1"
          required="required"
          value={data1}
          onChange={(e) => setData1(e.target.value)}
          placeholder=" Desc"
        />
      </div>
      <div>
        <input
          type="text"
          id="data2"
          required="required"
          value={data2}
          onChange={(e) => setData2(e.target.value)}
          placeholder=" Eth Amount"
        />
      </div>
      <div>
        <input
          type="Password"
          id="data3"
          required="required"
          value={data3}
          onChange={(e) => setData3(e.target.value)}
          placeholder=" Password"
        />
      </div>
      <button onClick={handlecreateReq} className="button button2">
        Create
      </button>
    </div>
  );
}

export default CreateReq;