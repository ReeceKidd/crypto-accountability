const ganache = require("ganache-cli");
import Web3 from "web3";
import * as AccountabilityContractFactory from "../build/AccountabilityContractFactory.json";
import * as AccountabilityContract from "../build/AccountabilityContract.json";

const web3 = new Web3(ganache.provider());

let accountabilityContractFactory: any;
let accountabilityContractAddress: any;
let accountabilityContract: any;
let accounts: string[];
let creator: string;
let name: string;
let description: string;
let failureRecipient: string;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  creator = accounts[0];
  accountabilityContractFactory = await new web3.eth.Contract(
    JSON.parse(AccountabilityContractFactory.interface)
  )
    .deploy({ data: AccountabilityContractFactory.bytecode })
    .send({ from: creator, gas: 1000000 });
  name = "Drink water everyday";
  description = "I must drink three litres of water everyday";
  failureRecipient = accounts[1];
  await accountabilityContractFactory.methods
    .createAccountabilityContract(creator, name, description, failureRecipient)
    .send({
      from: creator,
      gas: 1000000,
    });
  accountabilityContractAddress = await accountabilityContractFactory.methods
    .accountabilityContracts(0)
    .call({ from: creator });
  accountabilityContract = await new web3.eth.Contract(
    JSON.parse(AccountabilityContract.interface),
    accountabilityContractAddress
  );
});

describe("Accountability Contract", () => {
  describe("success", () => {
    it("deploys a contract", () => {
      expect(accountabilityContract.options.address).toBeDefined();
    });
    describe("initial values", () => {
      it("has a creator", async () => {
        const creator = await accountabilityContract.methods.creator().call();
        expect(creator).toEqual(creator);
      });
      it("has a name", async () => {
        const contractName = await accountabilityContract.methods.name().call();
        expect(contractName).toEqual(name);
      });
      it("has a description", async () => {
        const contractDescription = await accountabilityContract.methods
          .description()
          .call();
        expect(contractDescription).toEqual(description);
      });
      it("has a failure recipient", async () => {
        const contractFaulureRecipient = await accountabilityContract.methods
          .failureRecipient()
          .call();
        expect(contractFaulureRecipient).toEqual(failureRecipient);
      });
      it("has a status of OPEN", async () => {
        const status = await accountabilityContract.methods.status().call();
        expect(status).toEqual("0");
      });
    });

    it("when contract is failed balance is transfered to the failure recipient and status is set to failure", async () => {
      const initialContractBalance = Number(
        await web3.eth.getBalance(accountabilityContractAddress)
      );
      const initialFailureRecipientBalance = Number(
        await web3.eth.getBalance(failureRecipient)
      );
      await accountabilityContract.methods.failContract().send({
        from: creator,
      });
      const emptiedContractBalance = Number(
        await web3.eth.getBalance(accountabilityContractAddress)
      );
      const updatedFailureRecipientBalance = Number(
        await web3.eth.getBalance(failureRecipient)
      );
      const status = await accountabilityContract.methods.status().call();
      expect(status).toEqual("2");
      expect(emptiedContractBalance).toEqual(0);
      expect(updatedFailureRecipientBalance).toEqual(
        initialContractBalance + initialFailureRecipientBalance
      );
    });

    it("when contract is completed balance is transfered to original owner and status is set to success", async () => {
      const initialCreatorBalance = Number(await web3.eth.getBalance(creator));
      await accountabilityContract.methods.completeContract().send({
        from: creator,
      });
      const emptiedContractBalance = Number(
        await web3.eth.getBalance(accountabilityContractAddress)
      );
      const updatedCreatorBalance = Number(
        await web3.eth.getBalance(failureRecipient)
      );
      const status = await accountabilityContract.methods.status().call();
      expect(status).toEqual("1");
      expect(emptiedContractBalance).toEqual(0);
      expect(updatedCreatorBalance).toBeGreaterThan(initialCreatorBalance);
    });
  });
});
