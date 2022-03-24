import { useWeb3React } from "@web3-react/core";
import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
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
          .getOpenAccountabilityContractAddressesForReferee(account)
          .call();
        setAccountabilityContractAddresses(openAccountabilityContractAddresses);
      }
    },
    [account]
  );
  const [
    loadinggetOpenAccountabilityContractForReferees,
    setLoadingGetOpenAccountabilityContractsForReferee,
  ] = useState(false);
  const getOpenAccountabillityContracts = useCallback(
    async (
      openAccountabilityContractAddresses: string[],
      setAccountabilityContracts: (
        accountabilityContracts: {
          address: string;
          name: string;
          status: string;
          amount: string;
        }[]
      ) => void
    ) => {
      setLoadingGetOpenAccountabilityContractsForReferee(true);
      const openAccountabilityContracts = await Promise.all(
        openAccountabilityContractAddresses.map(async (address) => {
          const accountabilityContract = getAccountabilityContract(
            address! as string
          );
          const [name, status, amount] = await Promise.all([
            accountabilityContract.methods.name().call(),
            accountabilityContract.methods.status().call(),
            accountabilityContract.methods.amount().call(),
          ]);

          return {
            address,
            name,
            status: getContractStatus(status),
            amount,
          };
        })
      );
      setAccountabilityContracts(openAccountabilityContracts);
      setLoadingGetOpenAccountabilityContractsForReferee(false);
    },
    []
  );
  const [
    openAccountabilityContractAddresses,
    setOpenAccountabilityContractAddresses,
  ] = useState<string[]>([]);
  const [openAccountabilityContracts, setOpenAcccountabilityContracts] =
    useState<
      { address: string; name: string; status: string; amount: string }[]
    >([]);
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
          .getClosedAccountabilityContractAddressesForReferee(account)
          .call();
        setClosedAccountabilityContractAddresses(
          closedAccountabilityContractAddresses
        );
      }
    },
    [account]
  );
  const [
    loadingGetClosedAccountabilityContracts,
    setLoadingGetClosedAccountabilityContracts,
  ] = useState(false);
  const getClosedAccountabillityContracts = useCallback(
    async (
      closedAccountabilityContractAddresses: string[],
      setAccountabilityContracts: (
        accountabilityContracts: {
          address: string;
          name: string;
          status: string;
          amount: string;
        }[]
      ) => void
    ) => {
      setLoadingGetClosedAccountabilityContracts(true);
      const closedAccountabilityContracts = await Promise.all(
        closedAccountabilityContractAddresses.map(async (address) => {
          const closedAccountabilityContract = getAccountabilityContract(
            address! as string
          );
          const [name, status, amount] = await Promise.all([
            closedAccountabilityContract.methods.name().call(),
            closedAccountabilityContract.methods.status().call(),
            closedAccountabilityContract.methods.amount().call(),
          ]);

          return { address, name, status: getContractStatus(status), amount };
        })
      );
      setAccountabilityContracts(closedAccountabilityContracts);
      setLoadingGetClosedAccountabilityContracts(false);
    },
    []
  );
  const [
    closedAccountabilityContractAddresses,
    setClosedAccountabilityContractAddresses,
  ] = useState<string[]>([]);
  const [closedAccountabilityContracts, setClosedAcccountabilityContracts] =
    useState<
      { address: string; name: string; status: string; amount: string }[]
    >([]);
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
        <title>Contracts you referee</title>
      </Head>
      <Layout>
        <Segment>
          <h2>
            Open contracts you referee:
            {openAccountabilityContractAddresses.length}
          </h2>
          <ContractsTable contracts={openAccountabilityContracts} />
        </Segment>
        <Segment>
          <h2>
            Closed contracts you referee:
            {closedAccountabilityContractAddresses.length}
          </h2>
          <ContractsTable contracts={closedAccountabilityContracts} />
        </Segment>
      </Layout>
    </div>
  );
};

export default Contracts;
