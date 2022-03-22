import { useWeb3React } from "@web3-react/core";
import type { NextPage } from "next";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";
import ContractsTable from "../components/ContractsTable/ContractsTable";
import Layout from "../components/Layout/Layout";
import StatisticCards from "../components/StatisticCards/StatisticCards";
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
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [numberOfContracts, setNumberOfContracts] = useState(0);
  const [totalEthInContracts, setTotalEthInContracts] = useState("");
  const getNumberOfUsers = useCallback(
    async (setNumberOfUsers: (users: number) => void) => {
      const numberOfUsers = await factory.methods.numberOfUsers().call();
      setNumberOfUsers(numberOfUsers);
    },
    []
  );
  const getNumberOfContracts = useCallback(
    async (setNumberOfContracts: (contracts: number) => void) => {
      const numberOfContracts = await factory.methods
        .numberOfContracts()
        .call();
      setNumberOfContracts(numberOfContracts);
    },
    []
  );
  const getTotalEthInContracts = useCallback(
    async (setTotalEthInContracts: (totalEth: string) => void) => {
      const totalEthInContracts = await factory.methods
        .totalEthInContracts()
        .call();
      setTotalEthInContracts(totalEthInContracts);
    },
    []
  );
  useEffect(() => {
    getNumberOfUsers(setNumberOfUsers);
    getNumberOfContracts(setNumberOfContracts);
    getTotalEthInContracts(setTotalEthInContracts);
  }, [getNumberOfUsers, getNumberOfContracts, getTotalEthInContracts]);
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
            <h2>
              Your open contracts: {openAccountabilityContractAddresses.length}{" "}
            </h2>
          </div>
          <ContractsTable
            loading={loadingOpenAccountabilityContractsForUser}
            contracts={openAccountabilityContractsForUser}
          />
        </Segment>
        <Link href={"/contracts"}>View all contracts</Link>
        <br />
        <Segment>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>
              Contracts you referee:{" "}
              {openAccountabilityContractAddresses.length}{" "}
            </h2>
          </div>
          <ContractsTable
            loading={loadingOpenAccountabilityContractsForReferee}
            contracts={openAccountabilityContractsForReferee}
          />
        </Segment>
        <Link href={"/referee"}>View all contracts you referee</Link>
        <Segment>
          <h2>The numbers</h2>
          <StatisticCards
            numberOfUsers={numberOfUsers}
            numberOfContracts={numberOfContracts}
            totalEthInContracts={totalEthInContracts}
          />
        </Segment>
      </Layout>
    </div>
  );
};

export default Home;
