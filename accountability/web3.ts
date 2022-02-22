import Web3 from "web3";
 
declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

let web3: Web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/414c373d3dee40608a74142ce4a62a6d"
  );
  web3 = new Web3(provider);
}

export default web3;