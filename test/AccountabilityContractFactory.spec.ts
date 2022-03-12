const ganache = require("ganache-cli");
import Web3 from "web3";
import * as AccountabilityContractFactory from "../build/AccountabilityContractFactory.json";
import * as AccountabilityContract from "../build/AccountabilityContract.json";

const web3 = new Web3(ganache.provider());

let accountabilityContractFactory: any;
let openAccountabilityContractAddresses: any;
let openAccountabilityContractAddress: any;
let accounts: string[];
let manager: string;
let referee: string;
let amount: string;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  manager = accounts[0];
  const abi = AccountabilityContractFactory.abi;
  const bytecode = AccountabilityContractFactory.evm.bytecode.object;
  const gas = await new web3.eth.Contract(abi as any)
    .deploy({ data: bytecode })
    .estimateGas();
  referee = accounts[0];
  amount = web3.utils.toWei("0.0001", "ether");

  accountabilityContractFactory = await new web3.eth.Contract(
    AccountabilityContractFactory.abi as any
  )
    .deploy({
      data: bytecode,
    })
    .send({ from: manager, gas });
  const name = "Drink water everyday";
  const description = "I must drink three litres of water everyday";
  const failureRecipient = accounts[1];
  await accountabilityContractFactory.methods
    .createAccountabilityContract(referee, name, description, failureRecipient)
    .send({
      from: manager,
      gas: 3000000,
      value: amount,
    });
  openAccountabilityContractAddresses =
    await accountabilityContractFactory.methods
      .getOpenAccountabilityContractAddresses(manager)
      .call();
  openAccountabilityContractAddress =
    await accountabilityContractFactory.methods
      .getOpenAccountabilityContract(
        manager,
        openAccountabilityContractAddresses[0]
      )
      .call();
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
    it("can get open accountability contract address of user", async () => {
      const openAccountabilityContractAddresses =
        await accountabilityContractFactory.methods
          .getOpenAccountabilityContractAddresses(manager)
          .call();
      const openAccountabilityContractAddress =
        await accountabilityContractFactory.methods
          .getOpenAccountabilityContract(
            manager,
            openAccountabilityContractAddresses[0]
          )
          .call();
      expect(openAccountabilityContractAddress).toBeDefined();
    });
    it("can get closed accountability contract address of user", async () => {
      await accountabilityContractFactory.methods
        .failOpenAccountabilityContract(manager, 0)
        .send({ from: manager, gas: 1000000 });
      const closedAccountabilityContractAddresses =
        await accountabilityContractFactory.methods
          .getClosedAccountabilityContractAddresses(manager)
          .call();
      const closedAccountabilityContractAddress =
        await accountabilityContractFactory.methods
          .getOpenAccountabilityContract(
            manager,
            closedAccountabilityContractAddresses[0]
          )
          .call();
      expect(closedAccountabilityContractAddress).toBeDefined();
    });
    it("referee can fail an open accountability contract", async () => {
      await accountabilityContractFactory.methods
        .failOpenAccountabilityContract(manager, 0)
        .send({ from: manager, gas: 1000000 });

      const closedAccountabilityContracts =
        await accountabilityContractFactory.methods
          .getClosedAccountabilityContractAddresses(manager)
          .call();
      expect(closedAccountabilityContracts.length).toEqual(1);
      const openAccountabilityContracts =
        await accountabilityContractFactory.methods
          .getOpenAccountabilityContractAddresses(manager)
          .call();
      expect(openAccountabilityContracts.length).toEqual(0);
      const closedAccountabilityContractAddress =
        await accountabilityContractFactory.methods
          .getClosedAccountabilityContract(manager, 0)
          .call();
      const closedAccountabilityContract = await new web3.eth.Contract(
        AccountabilityContract.abi as any,
        closedAccountabilityContractAddress
      );
      const closedAccountabilityContractStatus =
        await closedAccountabilityContract.methods.status().call();
      expect(closedAccountabilityContractStatus).toEqual("2");
      const closedAcccountabilityContractBalance = await web3.eth.getBalance(
        closedAccountabilityContractAddress
      );
      expect(closedAcccountabilityContractBalance).toEqual("0");
    });
    it("referee can complete an open accountability contract", async () => {
      await accountabilityContractFactory.methods
        .completeOpenAccountabilityContract(manager, 0)
        .send({ from: manager, gas: 1000000 });

      const closedAccountabilityContracts =
        await accountabilityContractFactory.methods
          .getClosedAccountabilityContractAddresses(manager)
          .call();
      expect(closedAccountabilityContracts.length).toEqual(1);
      const openAccountabilityContracts =
        await accountabilityContractFactory.methods
          .getOpenAccountabilityContractAddresses(manager)
          .call();
      expect(openAccountabilityContracts.length).toEqual(0);
      const closedAccountabilityContractAddress =
        await accountabilityContractFactory.methods
          .getClosedAccountabilityContract(manager, 0)
          .call();
      const closedAccountabilityContract = await new web3.eth.Contract(
        AccountabilityContract.abi as any,
        closedAccountabilityContractAddress
      );
      const closedAccountabilityContractStatus =
        await closedAccountabilityContract.methods.status().call();
      expect(closedAccountabilityContractStatus).toEqual("1");
      const closedAcccountabilityContractBalance = await web3.eth.getBalance(
        closedAccountabilityContractAddress
      );
      expect(closedAcccountabilityContractBalance).toEqual("0");
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
      const openAccountabilityContracts =
        await accountabilityContractFactory.methods
          .getOpenAccountabilityContractAddresses(manager)
          .call();
      expect(openAccountabilityContracts.length).toEqual(2);
      const contractAddress = await accountabilityContractFactory.methods
        .getOpenAccountabilityContract(manager, openAccountabilityContracts[1])
        .call();
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
  });

  describe("errors", () => {
    it("creator cannot complete an open accountability contract if they are not the referee", async () => {
      try {
        await accountabilityContractFactory.methods
          .createAccountabilityContract(
            referee,
            "Drink water",
            "Everyday I must drink water",
            manager
          )
          .send({
            from: accounts[1],
            gas: 1000000,
            value: amount,
          });
        await accountabilityContractFactory.methods
          .completeOpenAccountabilityContract(accounts[1], 0)
          .send({ from: accounts[1], gas: 1000000 });
      } catch (err: any) {
        expect(err.message.includes("Only referee can complete a contract"));
      }
    });
    it("user who is not referee or creator cannot fail an open accountability contract", async () => {
      try {
        await accountabilityContractFactory.methods
          .failOpenAccountabilityContract(manager, 0)
          .send({ from: accounts[2], gas: 1000000 });
      } catch (err) {
        expect(err);
      }
    });
    it("non referee cannot complete an open accountability contract", async () => {
      try {
        await accountabilityContractFactory.methods
          .completeOpenAccountabilityContract(manager, 0)
          .send({ from: accounts[2], gas: 1000000 });
      } catch (err) {
        expect(err);
      }
    });
    it("referee cannot complete an accountability contract with a success status", async () => {
      await accountabilityContractFactory.methods
        .completeOpenAccountabilityContract(manager, 0)
        .send({ from: manager, gas: 1000000 });
      try {
        await accountabilityContractFactory.methods
          .completeOpenAccountabilityContract(manager, 0)
          .send({ from: manager, gas: 1000000 });
      } catch (err) {
        expect(err);
      }
    });
    it("referee cannot fail an accountability contract with a success status", async () => {
      await accountabilityContractFactory.methods
        .completeOpenAccountabilityContract(manager, 0)
        .send({ from: manager, gas: 1000000 });
      try {
        await accountabilityContractFactory.methods
          .failOpenAccountabilityContract(manager, 0)
          .send({ from: manager, gas: 1000000 });
      } catch (err) {
        expect(err);
      }
    });
    it("referee cannot complete an accountability contract with a success status", async () => {
      await accountabilityContractFactory.methods
        .completeOpenAccountabilityContract(manager, 0)
        .send({ from: manager, gas: 1000000 });
      try {
        await accountabilityContractFactory.methods
          .completeOpenAccountabilityContract(manager, 0)
          .send({ from: manager, gas: 1000000 });
      } catch (err) {
        expect(err);
      }
    });
    it("referee cannot fail an accountability contract with a failure status", async () => {
      await accountabilityContractFactory.methods
        .completeOpenAccountabilityContract(manager, 0)
        .send({ from: manager, gas: 1000000 });
      try {
        await accountabilityContractFactory.methods
          .failOpenAccountabilityContract(manager, 0)
          .send({ from: manager, gas: 1000000 });
      } catch (err) {
        expect(err);
      }
    });
    it("referee cannot fail an accountability contract with a failure status", async () => {
      await accountabilityContractFactory.methods
        .failOpenAccountabilityContract(manager, 0)
        .send({ from: manager, gas: 1000000 });
      try {
        await accountabilityContractFactory.methods
          .completeOpenAccountabilityContract(manager, 0)
          .send({ from: manager, gas: 1000000 });
      } catch (err) {
        expect(err);
      }
    });
  });
});
