import { useState, useEffect } from "react";
import CrowdFund from "../../contracts/CrowdFund.json";
import Web3 from "web3";





function Sendeth() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
   account: null,
  });
  const [ammount, setAmmount] = useState("");
  const [acount, setAcount] = useState("");
  // Other state variables as needed
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

  const handleSendeth = async () => {
    const { web3, contract, account } = state
    const value = web3.utils.toWei(ammount, "ether");

    try {
 
    await contract.methods.SendEth(account).send({ from: acount, value: value });
     
  
     window.location.reload();
  }catch (error) {
    console.error("Error sending Ether:", error);
  }
  };

  return (
    <div>
     
    <h2>Contribute</h2>
   
      
        <div>
          <div>
            <input
              type="text"
              id="ammount"
              required="required"
              value={ammount}
              onChange={(e) => setAmmount(e.target.value)}
              placeholder="Amount in Ether"
            />
          </div>
          <div>
            <input
              type="text"
              id="acount"
              required="required"
              value={acount}
              onChange={(e) => setAcount(e.target.value)}
              placeholder="Sender's Ethereum Address"
            />
          </div>
      
          <button onClick={ (state) => handleSendeth(state)} className="button button2">
            Send Ether
          </button>
        
        </div>
      
   
  </div>
  );
}

export default Sendeth;