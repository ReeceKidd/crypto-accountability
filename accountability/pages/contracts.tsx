import { useWeb3React } from "@web3-react/core";
import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import ContractsTable from "../components/ContractsTable/ContractsTable";
import Layout from "../components/Layout/Layout";
import factory, { getAccountabilityContract } from "../factory";
import { getContractStatus } from "../helpers/getContractStatus";

interface ContractsProps {}

const Contracts: NextPage<ContractsProps> = () => {
  const { account } = useWeb3React();
  const getOpenAccountabillityContractAddresses = useCallback(
    async (
      setAccountabilityContractAddresses: (addresses: string[]) => void
    ) => {
      if (account) {
        const openAccountabilityContractAddresses = await factory.methods
          .getOpenAccountabilityContractAddresses(account)
          .call();
        setAccountabilityContractAddresses(openAccountabilityContractAddresses);
      }
    },
    [account]
  );
  const getOpenAccountabillityContracts = useCallback(
    async (
      openAccountabilityContractAddresses: string[],
      setAccountabilityContracts: (
        accountabilityContracts: {
          id: string;
          name: string;
          status: string;
          amount: string;
        }[]
      ) => void
    ) => {
      const openAccountabilityContracts = await Promise.all(
        openAccountabilityContractAddresses.map(async (address) => {
          const id = await factory.methods
            .getOpenAccountabilityContract(account, address)
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
      setAccountabilityContracts(openAccountabilityContracts);
    },
    [account]
  );
  const [accountabilityContractAddresses, setAccountabilityContractAddresses] =
    useState<string[]>([]);
  const [accountabilityContracts, setAcccountabilityContracts] = useState<
    { id: string; name: string; status: string; amount: string }[]
  >([]);
  useEffect(() => {
    getOpenAccountabillityContractAddresses(setAccountabilityContractAddresses);
  }, [getOpenAccountabillityContractAddresses]);
  useEffect(() => {
    getOpenAccountabillityContracts(
      accountabilityContractAddresses,
      setAcccountabilityContracts
    );
  }, [getOpenAccountabillityContracts, accountabilityContractAddresses]);

  return (
    <div>
      <Head>
        <title>Open contracts</title>
      </Head>
      <Layout>
        <h1>Open contracts: {accountabilityContractAddresses.length}</h1>
        <ContractsTable contracts={accountabilityContracts} />
      </Layout>
    </div>
  );
};

export default Contracts;
