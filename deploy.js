const HDWalletProvider = require("@truffle/hdwallet-provider");
const path = require("path");
const Web3 = require("web3");
const fs = require("fs-extra");

const accountabilityContractFactoryPath = path.resolve(
  __dirname,
  "build",
  "AccountabilityContractFactory.json"
);
const accountabilityContractFactory = fs.readJSONSync(
  accountabilityContractFactoryPath
);

const provider = new HDWalletProvider(
  "abstract hat sure cherry whip genuine depth olive trouble dutch avoid add",
  "https://rinkeby.infura.io/v3/414c373d3dee40608a74142ce4a62a6d"
);

const web3 = new Web3(provider);

const abi = accountabilityContractFactory.abi;
const bytecode = accountabilityContractFactory.evm.bytecode.object;

const deploy = async () => {
  console.log("Started deploy...");
  const accounts = await web3.eth.getAccounts();
  const gasPrice = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .estimateGas();
  const contract = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: "10000000", gasPrice });
  console.log(accountabilityContractFactory.abi);
  fs.writeFileSync(
    "address.json",
    JSON.stringify({ address: contract.options.address })
  );
  console.log("Contract deployed to", contract.options.address);
};

deploy()
  .then(() => {
    process.exit(1);
  })
  .catch((err) => console.log("Error", err));
