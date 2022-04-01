/* eslint-disable @typescript-eslint/no-explicit-any */
import web3 from './web3';
import * as AccountabilityContractFactory from '../build/AccountabilityContractFactory.json';
import * as AccountabilityContract from '../build/AccountabilityContract.json';
import * as AccountabilityContractApprovalRequest from '../build/AccountabilityContractApprovalRequest.json';
import * as AccountabilityContractFactoryAddress from '../address.json';

const crowdfundFactoryInstance = new web3.eth.Contract(
  AccountabilityContractFactory.abi as any,
  AccountabilityContractFactoryAddress.address
);

export const getAccountabilityContract = (address: string) => {
  return new web3.eth.Contract(AccountabilityContract.abi as any, address);
};

export const getApprovalRequest = (address: string) => {
  return new web3.eth.Contract(
    AccountabilityContractApprovalRequest.abi as any,
    address
  );
};

export default crowdfundFactoryInstance;
