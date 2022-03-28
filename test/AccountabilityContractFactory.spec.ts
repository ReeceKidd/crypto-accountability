const ganache = require("ganache-cli");
import Web3 from "web3";
import * as AccountabilityContractFactory from "../build/AccountabilityContractFactory.json";
import * as AccountabilityContract from "../build/AccountabilityContract.json";

const web3 = new Web3(ganache.provider());

let accountabilityContractFactory: any;
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
      gas: 4000000,
      value: amount,
    });
});

describe("Accountability contract factory", () => {
  describe("success", () => {
    it("deploys a contract", () => {
      expect(accountabilityContractFactory.options.address).toBeDefined();
    });
    describe("factory", () => {
      it("can get number of total users", async () => {
        const numberOfUsers = await accountabilityContractFactory.methods
          .numberOfUsers()
          .call();
        expect(numberOfUsers).toEqual("1");
      });
      it("can get number of accountability contracts", async () => {
        const numberOfContracts = await accountabilityContractFactory.methods
          .numberOfAccountabilityContracts()
          .call();
        expect(numberOfContracts).toEqual("1");
      });
      it("can get total eth in contracts", async () => {
        const totalEthInContracts = await accountabilityContractFactory.methods
          .totalEthInContracts()
          .call();
        expect(totalEthInContracts).toEqual(amount);
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
      it("can get user addresses", async () => {
        const userAddresses = await accountabilityContractFactory.methods
          .getUserAddresses(0, 1)
          .call();
        expect(userAddresses.length).toEqual(1);
      });
      it("can get accountability contract addresses", async () => {
        const accountabilityContractAddresses =
          await accountabilityContractFactory.methods
            .getAccountabilityContractAddresses(0, 1)
            .call();
        expect(accountabilityContractAddresses.length).toEqual(1);
      });
    });
    describe("user", () => {
      it("can get open accountability contract addresses of user", async () => {
        const openAccountabilityContractAddresses =
          await accountabilityContractFactory.methods
            .getOpenAccountabilityContractAddressesForUser(manager)
            .call();
        expect(openAccountabilityContractAddresses).toBeDefined();
        expect(openAccountabilityContractAddresses.length).toEqual(1);
      });
      it("can get closed accountability contract addresses of user", async () => {
        const openAccountabilityContractAddresses =
          await accountabilityContractFactory.methods
            .getOpenAccountabilityContractAddressesForUser(manager)
            .call();
        await accountabilityContractFactory.methods
          .failOpenAccountabilityContract(
            manager,
            openAccountabilityContractAddresses[0]
          )
          .send({ from: manager, gas: 1000000 });
        const closedAccountabilityContractAddressesForUser =
          await accountabilityContractFactory.methods
            .getClosedAccountabilityContractAddressesForUser(manager)
            .call();
        expect(closedAccountabilityContractAddressesForUser).toBeDefined();
        expect(closedAccountabilityContractAddressesForUser.length).toEqual(1);
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
        const openAccountabilityContractAddresses =
          await accountabilityContractFactory.methods
            .getOpenAccountabilityContractAddressesForUser(manager)
            .call();
        expect(openAccountabilityContractAddresses.length).toEqual(2);
      });
    });
    describe("referee", () => {
      it("can get open accountability contract addresses of referee", async () => {
        const openAccountabilityContractAddresses =
          await accountabilityContractFactory.methods
            .getOpenAccountabilityContractAddressesForReferee(manager)
            .call();
        expect(openAccountabilityContractAddresses).toBeDefined();
        expect(openAccountabilityContractAddresses.length).toEqual(1);
      });
      it("can get closed accountability contract addresses of referee", async () => {
        const openAccountabilityContractAddresses =
          await accountabilityContractFactory.methods
            .getOpenAccountabilityContractAddressesForReferee(manager)
            .call();
        await accountabilityContractFactory.methods
          .failOpenAccountabilityContract(
            manager,
            openAccountabilityContractAddresses[0]
          )
          .send({ from: manager, gas: 1000000 });
        const closedAccountabilityContractAddressesForReferee =
          await accountabilityContractFactory.methods
            .getClosedAccountabilityContractAddressesForReferee(manager)
            .call();
        expect(closedAccountabilityContractAddressesForReferee).toBeDefined();
        expect(closedAccountabilityContractAddressesForReferee.length).toEqual(
          1
        );
      });
      it("can get complete accountability contract requests of referee", async () => {
        const openAccountabilityContractAddresses =
          await accountabilityContractFactory.methods
            .getOpenAccountabilityContractAddressesForReferee(manager)
            .call();
        await accountabilityContractFactory.methods
          .requestRefereeCompletesContract(
            referee,
            openAccountabilityContractAddresses[0]
          )
          .send({ from: manager, gas: 1000000 });
        const completeAccountabilityContractRequestAddresses =
          await accountabilityContractFactory.methods
            .getCompleteAccountabilityContractRequestsForReferee(manager)
            .call();
       expect(completeAccountabilityContractRequestAddresses.length).toEqual(1);
      });
      it("referee can fail an open accountability contract", async () => {
        const initialOpenAccountabilityContractAddresses =
          await accountabilityContractFactory.methods
            .getOpenAccountabilityContractAddressesForReferee(manager)
            .call();
        await accountabilityContractFactory.methods
          .failOpenAccountabilityContract(
            manager,
            initialOpenAccountabilityContractAddresses[0]
          )
          .send({ from: manager, gas: 1000000 });

        const closedAccountabilityContractAddresses =
          await accountabilityContractFactory.methods
            .getClosedAccountabilityContractAddressesForUser(manager)
            .call();
        expect(closedAccountabilityContractAddresses.length).toEqual(1);
        const openAccountabilityContractAddresses =
          await accountabilityContractFactory.methods
            .getOpenAccountabilityContractAddressesForUser(manager)
            .call();
        expect(openAccountabilityContractAddresses.length).toEqual(0);
        const closedAccountabilityContract = await new web3.eth.Contract(
          AccountabilityContract.abi as any,
          closedAccountabilityContractAddresses[0]
        );
        const closedAccountabilityContractStatus =
          await closedAccountabilityContract.methods.status().call();
        expect(closedAccountabilityContractStatus).toEqual("2");
        const closedAcccountabilityContractBalance = await web3.eth.getBalance(
          closedAccountabilityContractAddresses[0]
        );
        expect(closedAcccountabilityContractBalance).toEqual("0");
      });
      it("referee can complete an open accountability contract", async () => {
        const initialOpenAccountabilityContractAddresses =
          await accountabilityContractFactory.methods
            .getOpenAccountabilityContractAddressesForReferee(manager)
            .call();
        await accountabilityContractFactory.methods
          .completeOpenAccountabilityContract(
            manager,
            initialOpenAccountabilityContractAddresses[0]
          )
          .send({ from: manager, gas: 1000000 });
        const closedAccountabilityContractAddresses =
          await accountabilityContractFactory.methods
            .getClosedAccountabilityContractAddressesForUser(manager)
            .call();
        expect(closedAccountabilityContractAddresses.length).toEqual(1);
        const openAccountabilityContractAddresses =
          await accountabilityContractFactory.methods
            .getOpenAccountabilityContractAddressesForUser(manager)
            .call();
        expect(openAccountabilityContractAddresses.length).toEqual(0);
        const closedAccountabilityContract = await new web3.eth.Contract(
          AccountabilityContract.abi as any,
          closedAccountabilityContractAddresses[0]
        );
        const closedAccountabilityContractStatus =
          await closedAccountabilityContract.methods.status().call();
        expect(closedAccountabilityContractStatus).toEqual("1");
        const closedAcccountabilityContractBalance = await web3.eth.getBalance(
          closedAccountabilityContractAddresses[0]
        );
        expect(closedAcccountabilityContractBalance).toEqual("0");
      });
    });
  });

  describe("errors", () => {
    describe("user", () => {
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
          const openAccountabilityContractAddresses =
            await accountabilityContractFactory.methods
              .getOpenAccountabilityContractAddressesForUser(manager)
              .call();
          await accountabilityContractFactory.methods
            .completeOpenAccountabilityContract(
              manager,
              openAccountabilityContractAddresses[0]
            )
            .send({ from: accounts[2], gas: 1000000 });
        } catch (err) {
          expect(err);
        }
      });
      it("user cannot complete a contract that doesn't exist on the user", async () => {
        try {
          const openAccountabilityContractAddresses =
            await accountabilityContractFactory.methods
              .getOpenAccountabilityContractAddressesForUser(manager)
              .call();
          await accountabilityContractFactory.methods
            .completeOpenAccountabilityContract(
              manager,
              openAccountabilityContractAddresses[0]
            )
            .send({ from: accounts[2], gas: 1000000 });
        } catch (err) {
          expect(err);
        }
      });
    });

    describe("referee", () => {
      it("referee cannot complete an accountability contract with a success status", async () => {
        const openAccountabilityContractAddresses =
          await accountabilityContractFactory.methods
            .getOpenAccountabilityContractAddressesForUser(manager)
            .call();
        await accountabilityContractFactory.methods
          .completeOpenAccountabilityContract(
            manager,
            openAccountabilityContractAddresses[0]
          )
          .send({ from: manager, gas: 1000000 });
        try {
          await accountabilityContractFactory.methods
            .completeOpenAccountabilityContract(
              manager,
              openAccountabilityContractAddresses[0]
            )
            .send({ from: manager, gas: 1000000 });
        } catch (err) {
          expect(err);
        }
      });
      it("referee cannot fail an accountability contract with a success status", async () => {
        const openAccountabilityContractAddresses =
          await accountabilityContractFactory.methods
            .getOpenAccountabilityContractAddressesForUser(manager)
            .call();
        await accountabilityContractFactory.methods
          .completeOpenAccountabilityContract(
            manager,
            openAccountabilityContractAddresses[0]
          )
          .send({ from: manager, gas: 1000000 });
        try {
          await accountabilityContractFactory.methods
            .failOpenAccountabilityContract(
              manager,
              openAccountabilityContractAddresses[0]
            )
            .send({ from: manager, gas: 1000000 });
        } catch (err) {
          expect(err);
        }
      });
      it("referee cannot complete an accountability contract with a success status", async () => {
        const openAccountabilityContractAddresses =
          await accountabilityContractFactory.methods
            .getOpenAccountabilityContractAddressesForUser(manager)
            .call();
        await accountabilityContractFactory.methods
          .completeOpenAccountabilityContract(
            manager,
            openAccountabilityContractAddresses[0]
          )
          .send({ from: manager, gas: 1000000 });
        try {
          await accountabilityContractFactory.methods
            .completeOpenAccountabilityContract(
              manager,
              openAccountabilityContractAddresses[0]
            )
            .send({ from: manager, gas: 1000000 });
        } catch (err) {
          expect(err);
        }
      });

      it("referee cannot fail an accountability contract with a failure status", async () => {
        const openAccountabilityContractAddresses =
          await accountabilityContractFactory.methods
            .getOpenAccountabilityContractAddressesForUser(manager)
            .call();
        await accountabilityContractFactory.methods
          .completeOpenAccountabilityContract(
            manager,
            openAccountabilityContractAddresses[0]
          )
          .send({ from: manager, gas: 1000000 });
        try {
          await accountabilityContractFactory.methods
            .failOpenAccountabilityContract(
              manager,
              openAccountabilityContractAddresses[0]
            )
            .send({ from: manager, gas: 1000000 });
        } catch (err) {
          expect(err);
        }
      });
      it("referee cannot fail an accountability contract with a failure status", async () => {
        const openAccountabilityContractAddresses =
          await accountabilityContractFactory.methods
            .getOpenAccountabilityContractAddressesForUser(manager)
            .call();
        await accountabilityContractFactory.methods
          .failOpenAccountabilityContract(
            manager,
            openAccountabilityContractAddresses[0]
          )
          .send({ from: manager, gas: 1000000 });
        try {
          await accountabilityContractFactory.methods
            .completeOpenAccountabilityContract(
              manager,
              openAccountabilityContractAddresses[0]
            )
            .send({ from: manager, gas: 1000000 });
        } catch (err) {
          expect(err);
        }
      });
    });



  
 

  });
});
