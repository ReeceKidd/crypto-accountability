import type { NextPage } from "next";
import Head from "next/head";
import ContractsTable, {
  AccountabilityContract,
} from "../components/ContractsTable/ContractsTable";
import Layout from "../components/Layout/Layout";
import factory, { getAccountabilityContract } from "../factory";
import { getContractStatus } from "../helpers/getContractStatus";
import web3 from "../web3";

interface ContractsProps {
  numberOfAccountabilityContracts: number;
  accountabilityContracts: AccountabilityContract[];
}

const Contracts: NextPage<ContractsProps> = ({
  numberOfAccountabilityContracts,
  accountabilityContracts,
}) => {
  return (
    <div>
      <Head>
        <title>Open contracts</title>
      </Head>
      <Layout>
        <h1>Open contracts: {numberOfAccountabilityContracts}</h1>
        <ContractsTable contracts={accountabilityContracts} />
      </Layout>
    </div>
  );
};

Contracts.getInitialProps = async () => {
  const numberOfAccountabilityContracts = Number(
    await factory.methods.numberOfAccountabilityContracts().call()
  );
  const accountabilityContracts = await Promise.all(
    Array(numberOfAccountabilityContracts)
      .fill({})
      .map(async (_item, index) => {
        const id = await factory.methods.accountabilityContracts(index).call();
        const accountabilityContract = getAccountabilityContract(id! as string);
        const name = await accountabilityContract.methods.name().call();
        const status = await accountabilityContract.methods.status().call();
        const amount = await web3.eth.getBalance(id! as string);
        return { id, name, status: getContractStatus(status), amount };
      })
  );

  return {
    numberOfAccountabilityContracts,
    accountabilityContracts,
  };
};

export default Contracts;
