import web3 from "./web3";
import * as CrowdfundFactory from "../build/CrowdfundFactory.json";
import * as Crowdfund from "../build/Crowdfund.json";
import * as CrowdfundFactoryAddress from "../address.json";
import Web3 from "web3";

const crowdfundFactoryInstance = new web3.eth.Contract(
  JSON.parse(CrowdfundFactory.interface),
  CrowdfundFactoryAddress.address
);

export const getCrowdfundContract = (address: string) => {
  return new web3.eth.Contract(JSON.parse(Crowdfund.interface), address);
};

export default crowdfundFactoryInstance;
