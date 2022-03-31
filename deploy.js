const HDWalletProvider = require('@truffle/hdwallet-provider');
const path = require('path');
const Web3 = require('web3');
const fs = require('fs-extra');

const accountabilityContractFactoryPath = path.resolve(
  __dirname,
  'build',
  'AccountabilityContractFactory.json'
);
const accountabilityContractFactory = fs.readJSONSync(
  accountabilityContractFactoryPath
);

const provider = new HDWalletProvider(
  'tortoise spy bridge maximum plug physical trouble clean humble define debris upset',
  'https://rinkeby.infura.io/v3/236c8e8dd77b46e1b5fb499a334cfdb8'
);

const web3 = new Web3(provider);

const abi = accountabilityContractFactory.abi;
const bytecode = accountabilityContractFactory.evm.bytecode.object;

const deploy = async () => {
  console.log('Started deploy...');
  const accounts = await web3.eth.getAccounts();
  console.log('Balance', await web3.eth.getBalance(accounts[0]));
  const gasPrice = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .estimateGas();
  console.log('Gas price', gasPrice);
  const contract = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: gasPrice });
  console.log('Contract', contract);
  console.log(accountabilityContractFactory.abi);
  fs.writeFileSync(
    'address.json',
    JSON.stringify({ address: contract.options.address })
  );
  console.log('Contract deployed to', contract.options.address);
};

deploy()
  .then(() => {
    process.exit(1);
  })
  .catch((err) => console.log('Error', err));
