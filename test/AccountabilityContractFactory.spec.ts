const ganache = require("ganache-cli");
import Web3 from "web3";
import * as AccountabilityContractFactory from "../build/AccountabilityContractFactory.json";
import * as AccountabilityContract from "../build/AccountabilityContract.json";

const web3 = new Web3(ganache.provider());

let accountabilityContractFactory: any;
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
  const accountabilityContractAddress =
    await accountabilityContractFactory.methods
      .accountabilityContracts(0)
      .call({ from: manager });
  accountabilityContract = await new web3.eth.Contract(
    JSON.parse(AccountabilityContract.interface),
    accountabilityContractAddress
  );
});

describe("Accountability contract factory", () => {
  describe("success", () => {
    it("can get a list of deployed accountabilityContracts", async () => {
      const numberOfAccountabilityContracts =
        await accountabilityContractFactory.methods
          .numberOfAccountabilityContracts()
          .call({ from: manager });
      expect(numberOfAccountabilityContracts).toBeDefined();
    });
  });
});
