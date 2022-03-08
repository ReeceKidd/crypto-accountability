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

const deploy = async () => {
  console.log("Started deploy...");
  const accounts = await web3.eth.getAccounts();
  const balance = await web3.eth.getBalance(accounts[0]);
  console.log("Balance", balance);
  const estimatedGas = await new web3.eth.Contract(
    JSON.parse(accountabilityContractFactory.interface)
  )
    .deploy({
      data: accountabilityContractFactory.bytecode,
    })
    .estimateGas();
  console.log("Estimated gas", estimatedGas);
  const gasPrice = await web3.eth.getGasPrice();
  console.log("Gas price", gasPrice);
  const contract = await new web3.eth.Contract(
    JSON.parse(accountabilityContractFactory.interface)
  )
    .deploy({ data: accountabilityContractFactory.bytecode })
    .send({ from: accounts[0], gas: 2000000 });
  console.log(accountabilityContractFactory.interface);
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
