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
    loadingGetOpenAccountabilityContractForReferees,
    setLoadingGetOpenAccountabilityContractsForReferee,
  ] = useState(false);
  const [
    openAccountabilityContractAddresses,
    setOpenAccountabilityContractAddresses,
  ] = useState<string[]>([]);
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
    loadingGetClosedAccountabilityContractForReferees,
    setLoadingGetClosedAccountabilityContractsForReferee,
  ] = useState(false);
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

  return (
    <div>
      <Head>
        <title>Contracts you referee</title>
      </Head>
      <Layout>
        <Segment loading={loadingGetOpenAccountabilityContractForReferees}>
          <h2>
            {`Open contracts you referee:
            ${openAccountabilityContractAddresses.length}`}
          </h2>
          <AccountabilityContracts
            setLoading={setLoadingGetOpenAccountabilityContractsForReferee}
            accountabilityContractAddresses={
              openAccountabilityContractAddresses
            }
          />
        </Segment>
        <Segment loading={loadingGetClosedAccountabilityContractForReferees}>
          <h2>
            {`Closed contracts you referee: ${closedAccountabilityContractAddresses.length}`}
          </h2>
          <AccountabilityContracts
            setLoading={setLoadingGetClosedAccountabilityContractsForReferee}
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
