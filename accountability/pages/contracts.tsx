import { useWeb3React } from "@web3-react/core";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import ContractsTable from "../components/ContractsTable/ContractsTable";
import Layout from "../components/Layout/Layout";
import factory, { getAccountabilityContract } from "../factory";
import { getContractStatus } from "../helpers/getContractStatus";

interface ContractsProps {}

const Contracts: NextPage<ContractsProps> = () => {
  const { account } = useWeb3React();
  const geNumberOfAccountabillityContracts = async (
    setNumberOfAccountabilityContracts: (
      numberOfAccountabilityContracts: number
    ) => void
  ) => {
    try {
      const numberOfAccountabilityContracts = await factory.methods
        .getNumberOfAccountabilityContracts(account)
        .call({ from: account });
      setNumberOfAccountabilityContracts(numberOfAccountabilityContracts);
    } catch (err) {
      console.log("Error", err);
    }
  };
  const getAccountabillityContracts = async (
    setAccountabilityContracts: (
      accountabilityContracts: {
        id: string;
        name: string;
        status: string;
        amount: string;
      }[]
    ) => void
  ) => {
    try {
      const accountabilityContracts = await Promise.all(
        Array(numberOfAccountabilityContracts)
          .fill({})
          .map(async (_item, index) => {
            const id = await factory.methods
              .getAccountabilityContract(account, index)
              .call({ from: account });
            const accountabilityContract = getAccountabilityContract(
              id! as string
            );
            const [name, status, amount] = await Promise.all([
              accountabilityContract.methods.name().call(),
              accountabilityContract.methods.status().call(),
              accountabilityContract.methods.amount().call(),
            ]);

            return { id, name, status: getContractStatus(status), amount };
          })
      );
      setAccountabilityContracts(accountabilityContracts);
    } catch (err) {
      console.log("Error", err);
    }
  };
  const [numberOfAccountabilityContracts, setNumberOfAccountabilityContracts] =
    useState<number>();
  const [accountabilityContracts, setAcccountabilityContracts] = useState<
    { id: string; name: string; status: string; amount: string }[]
  >([]);
  useEffect(() => {
    geNumberOfAccountabillityContracts(setNumberOfAccountabilityContracts);
    getAccountabillityContracts(setAcccountabilityContracts);
  }, []);

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

export default Contracts;
