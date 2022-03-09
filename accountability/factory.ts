import web3 from "./web3";
import * as AccountabilityContractFactory from "../build/AccountabilityContractFactory.json";
import * as AccountabilityContract from "../build/AccountabilityContract.json";
import * as AccountabilityContractFactoryAddress from "../address.json";

const crowdfundFactoryInstance = new web3.eth.Contract(
  AccountabilityContractFactory.abi as any,
  AccountabilityContractFactoryAddress.address
);

export const getAccountabilityContract = (address: string) => {
  return new web3.eth.Contract(AccountabilityContract.abi as any, address);
};

export default crowdfundFactoryInstance;
