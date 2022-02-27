import type { NextPage } from "next";
import Head from "next/head";
import ContractsList, {
  ContractsListItem,
} from "../components/ContractsList/ContractsList";
import Layout from "../components/Layout/Layout";
import factory, { getAccountabilityContract } from "../factory";

interface ContractsProps {
  numberOfAccountabilityContracts: number;
  accountabilityContracts: ContractsListItem[];
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
        <ContractsList contracts={accountabilityContracts} />
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
        const creator = await accountabilityContract.methods.creator().call();
        const name = await accountabilityContract.methods.name().call();
        const description = await accountabilityContract.methods
          .description()
          .call();
        return { id, creator, name, description };
      })
  );

  return {
    numberOfAccountabilityContracts,
    accountabilityContracts,
  };
};

export default Contracts;
