import { useWeb3React } from "@web3-react/core";
import type { NextPage } from "next";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import ContractsTable from "../components/ContractsTable/ContractsTable";
import Layout from "../components/Layout/Layout";
import factory, { getAccountabilityContract } from "../factory";
import { getContractStatus } from "../helpers/getContractStatus";

const Home: NextPage = () => {
  const { account } = useWeb3React();
  const [
    loadingOpenAccountabilityContractsForUser,
    setLoadingOpenAccountabilityContractsForUser,
  ] = useState(false);
  const getOpenAccountabillityContractAddressesForUser = useCallback(
    async (
      setAccountabilityContractAddresses: (addresses: string[]) => void
    ) => {
      if (account) {
        const openAccountabilityContractAddresses = await factory.methods
          .getOpenAccountabilityContractAddressesForUser(account)
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
          address: string;
          name: string;
          status: string;
          amount: string;
        }[]
      ) => void
    ) => {
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
    },
    []
  );
  const [
    openAccountabilityContractAddresses,
    setOpenAccountabilityContractAddresses,
  ] = useState<string[]>([]);
  const [
    openAccountabilityContractsForUser,
    setOpenAcccountabilityContractsForUser,
  ] = useState<
    { address: string; name: string; status: string; amount: string }[]
  >([]);
  useEffect(() => {
    getOpenAccountabillityContractAddressesForUser(
      setOpenAccountabilityContractAddresses
    );
  }, [getOpenAccountabillityContractAddressesForUser]);
  useEffect(() => {
    setLoadingOpenAccountabilityContractsForUser(true);
    getOpenAccountabillityContracts(
      openAccountabilityContractAddresses,
      setOpenAcccountabilityContractsForUser
    );
    setLoadingOpenAccountabilityContractsForUser(false);
  }, [getOpenAccountabillityContracts, openAccountabilityContractAddresses]);
  const [
    loadingOpenAccountabilityContractsForReferee,
    setLoadingOpenAccountabilityContractsForReferee,
  ] = useState(false);
  const getOpenAccountabillityContractAddressesForReferee = useCallback(
    async (
      setAccountabilityContractAddressesForReferee: (
        addresses: string[]
      ) => void
    ) => {
      if (account) {
        const openAccountabilityContractAddresses = await factory.methods
          .getOpenAccountabilityContractAddressesForReferee(account)
          .call();
        setAccountabilityContractAddressesForReferee(
          openAccountabilityContractAddresses
        );
      }
    },
    [account]
  );
  const [
    openAccountabilityContractAddressesForReferee,
    setOpenAccountabilityContractAddressesForReferee,
  ] = useState<string[]>([]);
  const [
    openAccountabilityContractsForReferee,
    setOpenAcccountabilityContractsForReferee,
  ] = useState<
    { address: string; name: string; status: string; amount: string }[]
  >([]);
  useEffect(() => {
    getOpenAccountabillityContractAddressesForReferee(
      setOpenAccountabilityContractAddressesForReferee
    );
  }, [getOpenAccountabillityContractAddressesForReferee]);
  useEffect(() => {
    setLoadingOpenAccountabilityContractsForReferee(true);
    getOpenAccountabillityContracts(
      openAccountabilityContractAddressesForReferee,
      setOpenAcccountabilityContractsForReferee
    );
    setLoadingOpenAccountabilityContractsForReferee(false);
  }, [
    getOpenAccountabillityContracts,
    getOpenAccountabillityContractAddressesForReferee,
    openAccountabilityContractAddressesForReferee,
  ]);
  return (
    <div>
      <title>Crypto accountability</title>
      <meta
        name="description"
        content="Stay accountability by betting crypto"
      />
      <Layout>
        <Segment>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>
              Your open contracts: {openAccountabilityContractAddresses.length}{" "}
            </h1>
          </div>
          <ContractsTable
            loading={loadingOpenAccountabilityContractsForUser}
            contracts={openAccountabilityContractsForUser}
          />
          <Link href={"/contracts"}>View all contracts</Link>
        </Segment>
        <br />
        <Segment>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>
              Contracts you referee:{" "}
              {openAccountabilityContractAddresses.length}{" "}
            </h1>
          </div>
          <ContractsTable
            loading={loadingOpenAccountabilityContractsForReferee}
            contracts={openAccountabilityContractsForReferee}
          />
          <Link href={"/referee"}>View all contracts you referee</Link>
        </Segment>
      </Layout>
    </div>
  );
};

export default Home;
