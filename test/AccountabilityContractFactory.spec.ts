const ganache = require("ganache-cli");
import Web3 from "web3";
import * as AccountabilityContractFactory from "../build/AccountabilityContractFactory.json";
import * as AccountabilityContract from "../build/AccountabilityContract.json";

const web3 = new Web3(ganache.provider());

let accountabilityContractFactory: any;
let openAccountabilityContractAddress: any;
let accountabilityContract: any;
let accounts: string[];
let manager: string;
let referee: string;
let amount: string;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  manager = accounts[0];
  referee = accounts[0];
  amount = web3.utils.toWei("0.0001", "ether");
  accountabilityContractFactory = await new web3.eth.Contract(
    JSON.parse(AccountabilityContractFactory.interface)
  )
    .deploy({ data: AccountabilityContractFactory.bytecode })
    .send({ from: manager, gas: 1000000 });
  const name = "Drink water everyday";
  const description = "I must drink three litres of water everyday";
  const failureRecipient = accounts[1];
  await accountabilityContractFactory.methods
    .createAccountabilityContract(referee, name, description, failureRecipient)
    .send({
      from: manager,
      gas: 1000000,
      value: amount,
    });
  openAccountabilityContractAddress =
    await accountabilityContractFactory.methods
      .getOpenAccountabilityContract(manager, 0)
      .call();
  accountabilityContract = await new web3.eth.Contract(
    JSON.parse(AccountabilityContract.interface),
    openAccountabilityContractAddress
  );
});

describe("Accountability contract factory", () => {
  describe("success", () => {
    it("deploys a contract", () => {
      expect(accountabilityContractFactory.options.address).toBeDefined();
    });
    it("can get number of total users", async () => {
      const numberOfUsers = await accountabilityContractFactory.methods
        .numberOfUsers()
        .call();
      expect(numberOfUsers).toEqual("1");
    });
    it("can get number of open accountability contracts for user", async () => {
      const userNumberOfOpenAccountabilityContracts =
        await accountabilityContractFactory.methods
          .getNumberOfOpenAccountabilityContracts(manager)
          .call();
      expect(userNumberOfOpenAccountabilityContracts).toBeDefined();
    });
    it("can get open accountability contract address of user", async () => {
      const openAccountabilityContractAddress =
        await accountabilityContractFactory.methods
          .getOpenAccountabilityContract(manager, 0)
          .call();
      expect(openAccountabilityContractAddress).toBeDefined();
    });
    it("can get number of closed accountability contracts for user", async () => {
      const userNumberOfClosedAccountabilityContracts =
        await accountabilityContractFactory.methods
          .getNumberOfClosedAccountabilityContracts(manager)
          .call();
      expect(userNumberOfClosedAccountabilityContracts).toEqual("0");
    });
    it("can fail an open accountability contract", async () => {
      const initialNumberOfOpenContracts = Number(
        await accountabilityContractFactory.methods
          .getNumberOfOpenAccountabilityContracts(manager)
          .call()
      );
      await accountabilityContractFactory.methods
        .failOpenAccountabilityContract(manager, 0)
        .send({ from: manager, gas: 1000000 });

      const numberOfClosedAccountabilityContracts =
        await accountabilityContractFactory.methods
          .getNumberOfClosedAccountabilityContracts(manager)
          .call();
      expect(numberOfClosedAccountabilityContracts).toEqual("1");
      const updatedNumberOfOpenContracts = Number(
        await accountabilityContractFactory.methods
          .getNumberOfOpenAccountabilityContracts(manager)
          .call()
      );
      expect(updatedNumberOfOpenContracts).toEqual(
        initialNumberOfOpenContracts - 1
      );
      const closedAccountabilityContractAddress =
        await accountabilityContractFactory.methods
          .getClosedAccountabilityContract(manager, 0)
          .call();
      const closedAccountabilityContract = await new web3.eth.Contract(
        JSON.parse(AccountabilityContract.interface),
        closedAccountabilityContractAddress
      );
      const closedAccountabilityContractStatus =
        await closedAccountabilityContract.methods.status().call();
      expect(closedAccountabilityContractStatus).toEqual("2");
      const closedAcccountabilityContractBalance = await web3.eth.getBalance(
        closedAccountabilityContractAddress
      );
      expect(closedAcccountabilityContractBalance).toEqual("0");
      const openContractAddress = await accountabilityContractFactory.methods
        .getOpenAccountabilityContract(manager, 0)
        .call();
      expect(openContractAddress).toEqual(
        "0x0000000000000000000000000000000000000000"
      );
    });
    it("can complete an open accountability contract", async () => {
      const initialNumberOfOpenContracts = Number(
        await accountabilityContractFactory.methods
          .getNumberOfOpenAccountabilityContracts(manager)
          .call()
      );
      await accountabilityContractFactory.methods
        .completeOpenAccountabilityContract(manager, 0)
        .send({ from: manager, gas: 1000000 });

      const numberOfClosedAccountabilityContracts =
        await accountabilityContractFactory.methods
          .getNumberOfClosedAccountabilityContracts(manager)
          .call();
      expect(numberOfClosedAccountabilityContracts).toEqual("1");
      const updatedNumberOfOpenContracts = Number(
        await accountabilityContractFactory.methods
          .getNumberOfOpenAccountabilityContracts(manager)
          .call()
      );
      expect(updatedNumberOfOpenContracts).toEqual(
        initialNumberOfOpenContracts - 1
      );
      const closedAccountabilityContractAddress =
        await accountabilityContractFactory.methods
          .getClosedAccountabilityContract(manager, 0)
          .call();
      const closedAccountabilityContract = await new web3.eth.Contract(
        JSON.parse(AccountabilityContract.interface),
        closedAccountabilityContractAddress
      );
      const closedAccountabilityContractStatus =
        await closedAccountabilityContract.methods.status().call();
      expect(closedAccountabilityContractStatus).toEqual("1");
      const closedAcccountabilityContractBalance = await web3.eth.getBalance(
        closedAccountabilityContractAddress
      );
      expect(closedAcccountabilityContractBalance).toEqual("0");
      const openContractAddress = await accountabilityContractFactory.methods
        .getOpenAccountabilityContract(manager, 0)
        .call();
      expect(openContractAddress).toEqual(
        "0x0000000000000000000000000000000000000000"
      );
    });
    it("can create additional accountability contracts for user", async () => {
      await accountabilityContractFactory.methods
        .createAccountabilityContract(
          referee,
          "Drink water",
          "Everyday I must drink water",
          manager
        )
        .send({
          from: manager,
          gas: 1000000,
          value: amount,
        });
      const userNumberOfOpenAccountabilityContracts =
        await accountabilityContractFactory.methods
          .getNumberOfOpenAccountabilityContracts(manager)
          .call();
      const contractAddress = await accountabilityContractFactory.methods
        .getOpenAccountabilityContract(manager, 1)
        .call();
      expect(userNumberOfOpenAccountabilityContracts).toEqual("2");
      expect(contractAddress).toBeDefined();
    });
    it("increases number of users by one when a new user creates a contract", async () => {
      await accountabilityContractFactory.methods
        .createAccountabilityContract(
          manager,
          "Drink water",
          "Everyday I must drink water",
          manager
        )
        .send({
          from: accounts[2],
          gas: 1000000,
          value: amount,
        });
      const numberOfUsers = await accountabilityContractFactory.methods
        .numberOfUsers()
        .call();
      expect(numberOfUsers).toEqual("2");
    });
    it("returns 0 if user has no contracts", async () => {
      const userNumberOfAccountabilityContracts =
        await accountabilityContractFactory.methods
          .getNumberOfOpenAccountabilityContracts(accounts[3])
          .call({ from: accounts[3] });
      expect(userNumberOfAccountabilityContracts).toEqual("0");
    });
    it("returns null address if contract index doesn't exist", async () => {
      const contractAddress = await accountabilityContractFactory.methods
        .getOpenAccountabilityContract(manager, 5)
        .call();
      expect(contractAddress).toEqual(
        "0x0000000000000000000000000000000000000000"
      );
    });
    it("returns null address if user address has no contracts", async () => {
      const contractAddress = await accountabilityContractFactory.methods
        .getOpenAccountabilityContract(accounts[3], 0)
        .call();
      expect(contractAddress).toEqual(
        "0x0000000000000000000000000000000000000000"
      );
    });
  });
});
