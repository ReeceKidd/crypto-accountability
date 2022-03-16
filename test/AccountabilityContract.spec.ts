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
let referee: string;
let amount: string;
let name: string;
let description: string;
let failureRecipient: string;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  creator = accounts[0];
  referee = accounts[0];
  const abi = AccountabilityContractFactory.abi;
  const bytecode = AccountabilityContractFactory.evm.bytecode.object;
  const gas = await new web3.eth.Contract(abi as any)
    .deploy({ data: bytecode })
    .estimateGas();
  amount = web3.utils.toWei("0.001", "ether");
  accountabilityContractFactory = await new web3.eth.Contract(abi as any)
    .deploy({ data: bytecode })
    .send({ from: creator, gas });
  name = "Drink water everyday";
  description = "I must drink three litres of water everyday";
  failureRecipient = accounts[1];
  await accountabilityContractFactory.methods
    .createAccountabilityContract(referee, name, description, failureRecipient)
    .send({
      from: creator,
      gas: 3000000,
      value: amount,
    });
  const openAccountabilityContractAddresses =
    await accountabilityContractFactory.methods
      .getOpenAccountabilityContractAddressesForUser(creator)
      .call();
  accountabilityContractAddress = openAccountabilityContractAddresses[0];
  accountabilityContract = await new web3.eth.Contract(
    AccountabilityContract.abi as any,
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
      it("has an amount of value sent", async () => {
        const contractAmount = await accountabilityContract.methods
          .amount()
          .call();
        expect(contractAmount).toEqual(amount);
      });
      it("has a status of OPEN", async () => {
        const status = await accountabilityContract.methods.status().call();
        expect(status).toEqual("0");
      });
      it("has initial balance of value sent", async () => {
        const initialBalance = await web3.eth.getBalance(
          accountabilityContractAddress
        );
        expect(initialBalance).toEqual(amount);
      });
    });
  });

  describe("errors", () => {
    it("fails if something other than the Accountability Contract factory calls failContract", async () => {
      try {
        await accountabilityContract.methods.completeContract().send({
          from: accounts[0],
        });
      } catch (err) {
        expect(err);
      }
    });
    it("fails if something other than the Accountability Contract factory calls completeContractContract", async () => {
      try {
        await accountabilityContract.methods.completeContract().send({
          from: accounts[0],
        });
      } catch (err) {
        expect(err);
      }
    });
  });
});
