import { useWeb3React } from "@web3-react/core";
import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import AccountabilityContracts from "../components/AccountabilityContracts/AccountabilityContracts";
import ContractsTable from "../components/ContractsTable/ContractsTable";
import Layout from "../components/Layout/Layout";
import factory, { getAccountabilityContract } from "../factory";
import { getContractStatus } from "../helpers/getContractStatus";

interface ContractsProps {}

const Contracts: NextPage<ContractsProps> = () => {
  const { account } = useWeb3React();
  const [
    loadingGetOpenAccountabilityContractAddresses,
    setLoadingGetOpenAccountabilityContractAddresses,
  ] = useState(false);
  const getOpenAccountabillityContractAddresses = useCallback(
    async (
      setAccountabilityContractAddresses: (addresses: string[]) => void
    ) => {
      setLoadingGetOpenAccountabilityContractAddresses(true);
      if (account) {
        const openAccountabilityContractAddresses = await factory.methods
          .getOpenAccountabilityContractAddressesForUser(account)
          .call();
        setAccountabilityContractAddresses(openAccountabilityContractAddresses);
      }
      setLoadingGetOpenAccountabilityContractAddresses(false);
    },
    [account]
  );
  const [
    loadingGetOpenAccountabilityContractForUsers,
    setLoadingGetOpenAccountabilityContractsForUser,
  ] = useState(false);
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
  const getClosedAccountabillityContractAddresses = useCallback(
    async (
      setClosedAccountabilityContractAddresses: (addresses: string[]) => void
    ) => {
      if (account) {
        const closedAccountabilityContractAddresses = await factory.methods
          .getClosedAccountabilityContractAddressesForUser(account)
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
  const [
    closedAccountabilityContractAddresses,
    setClosedAccountabilityContractAddresses,
  ] = useState<string[]>([]);
  useEffect(() => {
    getClosedAccountabillityContractAddresses(
      setClosedAccountabilityContractAddresses
    );
  }, [getClosedAccountabillityContractAddresses]);

  return (
    <div>
      <Head>
        <title>Contracts</title>
      </Head>
      <Layout>
        <Segment
          loading={
            loadingGetOpenAccountabilityContractAddresses ||
            loadingGetOpenAccountabilityContractForUsers
          }
        >
          <h2>Open contracts: {openAccountabilityContractAddresses.length}</h2>
          <AccountabilityContracts
            setLoading={setLoadingGetOpenAccountabilityContractAddresses}
            accountabilityContractAddresses={
              openAccountabilityContractAddresses
            }
          />
        </Segment>
        <Segment loading={loadingGetClosedAccountabilityContracts}>
          <h2>
            Closed contracts: {closedAccountabilityContractAddresses.length}
          </h2>
          <AccountabilityContracts
            setLoading={setLoadingGetOpenAccountabilityContractAddresses}
            accountabilityContractAddresses={
              closedAccountabilityContractAddresses
            }
          />
        </Segment>
      </Layout>
    </div>
  );
};

export default Contracts;
