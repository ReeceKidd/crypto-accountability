import Web3 from "web3";
 
declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

const provider = new Web3.providers.HttpProvider(
  "https://rinkeby.infura.io/v3/414c373d3dee40608a74142ce4a62a6d"
);
const web3 = new Web3(provider);


export default web3;