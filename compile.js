/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const accountabilityContractPath = path.resolve(
  __dirname,
  'contracts',
  'AccountabilityContract.sol'
);
const source = fs.readFileSync(accountabilityContractPath, 'utf8');
const input = {
  language: 'Solidity',
  sources: {
    Contracts: {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};
const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts;

fs.ensureDirSync(buildPath);

for (let contract of Object.keys(output.Contracts)) {
  fs.outputJsonSync(path.resolve(buildPath, `${contract}.json`), {
    abi: output.Contracts[contract].abi,
    evm: output.Contracts[contract].evm
  });
}
