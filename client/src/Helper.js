
import React, { useState, useEffect, createContext, useContext } from "react";
import CrowdFund from "./contracts/CrowdFund.json";
import Web3 from "web3";
import "./App.css"

// Create a context to provide the state
const HelperContext = createContext();

function Helper() {
  const [state, setState] = useState({
    web3: null,
    contract: null,
    account: null,
  });

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
      setState({ web3: web3, contract: contract, account: account });
    }
    provider && template();
  }, []);

  // Provide the state through the context
  return (
    <HelperContext.Provider value={state}>
     state;
    </HelperContext.Provider>
  );
}

// A custom hook to access the state in other components
function UseHelperState() {
  return useContext(HelperContext);
}

export { Helper, UseHelperState };