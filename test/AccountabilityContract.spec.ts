const ganache = require("ganache-cli");
import Web3 from "web3";
import * as AccountabilityContractFactory from "../build/AccountabilityContractFactory.json";
import * as AccountabilityContract from "../build/AccountabilityContract.json";

const web3 = new Web3(ganache.provider());

let accountabilityContractFactory: any;
let accountabilityContract: any;
let accounts: string[];
let user: string;
let name: string;
let description: string;
let failureRecipient: string;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  user = accounts[0];
  accountabilityContractFactory = await new web3.eth.Contract(
    JSON.parse(AccountabilityContractFactory.interface)
  )
    .deploy({ data: AccountabilityContractFactory.bytecode })
    .send({ from: user, gas: 1000000 });
  name = "Drink water everyday";
  description = "I must drink three litres of water everyday";
  failureRecipient = accounts[1];
  await accountabilityContractFactory.methods
    .createAccountabilityContract(name, description, failureRecipient)
    .send({
      from: user,
      gas: 1000000,
    });
  const accountabilityContractAddress =
    await accountabilityContractFactory.methods
      .accountabilityContracts(0)
      .call({ from: user });
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
    it("has a creator", async () => {
      const creator = await accountabilityContract.methods.creator().call();
      expect(creator).toEqual(user);
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
  });
});
