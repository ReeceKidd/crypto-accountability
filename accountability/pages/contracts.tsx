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
  const [
    openAccountabilityContractAddresses,
    setOpenAccountabilityContractAddresses,
  ] = useState<string[]>([]);
  const [openAccountabilityContracts, setOpenAcccountabilityContracts] =
    useState<{ id: string; name: string; status: string; amount: string }[]>(
      []
    );
  useEffect(() => {
    getOpenAccountabillityContractAddresses(
      setOpenAccountabilityContractAddresses
    );
  }, [getOpenAccountabillityContractAddresses]);
  useEffect(() => {
    getOpenAccountabillityContracts(
      openAccountabilityContractAddresses,
      setOpenAcccountabilityContracts
    );
  }, [
    getOpenAccountabillityContracts,
    openAccountabilityContractAddresses,
    openAccountabilityContractAddresses.length,
  ]);
  const getClosedAccountabillityContractAddresses = useCallback(
    async (
      setClosedAccountabilityContractAddresses: (addresses: string[]) => void
    ) => {
      if (account) {
        const closedAccountabilityContractAddresses = await factory.methods
          .getClosedAccountabilityContractAddresses(account)
          .call();
        setClosedAccountabilityContractAddresses(
          closedAccountabilityContractAddresses
        );
      }
    },
    [account]
  );
  const getClosedAccountabillityContracts = useCallback(
    async (
      closedAccountabilityContractAddresses: string[],
      setAccountabilityContracts: (
        accountabilityContracts: {
          id: string;
          name: string;
          status: string;
          amount: string;
        }[]
      ) => void
    ) => {
      const closedAccountabilityContracts = await Promise.all(
        closedAccountabilityContractAddresses.map(async (address) => {
          const id = await factory.methods
            .getClosedAccountabilityContract(account, address)
            .call({ from: account });
          const closedAccountabilityContract = getAccountabilityContract(
            id! as string
          );
          const [name, status, amount] = await Promise.all([
            closedAccountabilityContract.methods.name().call(),
            closedAccountabilityContract.methods.status().call(),
            closedAccountabilityContract.methods.amount().call(),
          ]);

          return { id, name, status: getContractStatus(status), amount };
        })
      );
      setAccountabilityContracts(closedAccountabilityContracts);
    },
    [account]
  );
  const [
    closedAccountabilityContractAddresses,
    setClosedAccountabilityContractAddresses,
  ] = useState<string[]>([]);
  const [closedAccountabilityContracts, setClosedAcccountabilityContracts] =
    useState<{ id: string; name: string; status: string; amount: string }[]>(
      []
    );
  useEffect(() => {
    getClosedAccountabillityContractAddresses(
      setClosedAccountabilityContractAddresses
    );
  }, [getClosedAccountabillityContractAddresses]);
  useEffect(() => {
    getClosedAccountabillityContracts(
      closedAccountabilityContractAddresses,
      setClosedAcccountabilityContracts
    );
  }, [
    getClosedAccountabillityContracts,
    closedAccountabilityContractAddresses,
    closedAccountabilityContractAddresses.length,
  ]);

  return (
    <div>
      <Head>
        <title>Contracts</title>
      </Head>
      <Layout>
        <h1>Open contracts: {openAccountabilityContractAddresses.length}</h1>
        <ContractsTable
          loading={false}
          contracts={openAccountabilityContracts}
        />
        <h1>
          Closed contracts: {closedAccountabilityContractAddresses.length}
        </h1>
        <ContractsTable
          loading={false}
          contracts={closedAccountabilityContracts}
        />
      </Layout>
    </div>
  );
};

export default Contracts;
