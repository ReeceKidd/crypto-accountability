import { useWeb3React } from "@web3-react/core";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button, Segment } from "semantic-ui-react";
import ContractsTable from "../../components/ContractsTable/ContractsTable";
import Layout from "../../components/Layout/Layout";
import factory, { getAccountabilityContract } from "../../factory";
import { getContractStatus } from "../../helpers/getContractStatus";

interface SpecificUserProps {}

const SpecificUser: NextPage<SpecificUserProps> = () => {
  const router = useRouter();
  const { address } = router.query;
  const [
    loadingOpenAccountabilityContractsForUser,
    setLoadingOpenAccountabilityContractsForUser,
  ] = useState(false);
  const getOpenAccountabillityContractAddressesForUser = useCallback(
    async (
      setAccountabilityContractAddresses: (addresses: string[]) => void
    ) => {
      if (address) {
        const openAccountabilityContractAddresses = await factory.methods
          .getOpenAccountabilityContractAddressesForUser(address)
          .call();
        setAccountabilityContractAddresses(openAccountabilityContractAddresses);
      }
    },
    [address]
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
      ) => void,
      setLoadingOpenAccountabilityContracts: Dispatch<SetStateAction<boolean>>
    ) => {
      setLoadingOpenAccountabilityContracts(true);
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
      setLoadingOpenAccountabilityContracts(false);
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
    getOpenAccountabillityContracts(
      openAccountabilityContractAddresses,
      setOpenAcccountabilityContractsForUser,
      setLoadingOpenAccountabilityContractsForUser
    );
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
      if (address) {
        const openAccountabilityContractAddresses = await factory.methods
          .getOpenAccountabilityContractAddressesForReferee(address)
          .call();
        setAccountabilityContractAddressesForReferee(
          openAccountabilityContractAddresses
        );
      }
    },
    [address]
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
    getOpenAccountabillityContracts(
      openAccountabilityContractAddressesForReferee,
      setOpenAcccountabilityContractsForReferee,
      setLoadingOpenAccountabilityContractsForReferee
    );
  }, [
    getOpenAccountabillityContracts,
    getOpenAccountabillityContractAddressesForReferee,
    openAccountabilityContractAddressesForReferee,
  ]);
  return (
    <>
      <Head>
        <title>{address}</title>
      </Head>
      <Layout>
        <h1>{`User: ${address}`}</h1>
        <Link passHref href={`https://rinkeby.etherscan.io/address/${address}`}>
          <Button primary>View on etherscan</Button>
        </Link>

        <Segment>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>
              Open contracts: {openAccountabilityContractAddresses.length}
            </h2>
          </div>
          <ContractsTable contracts={openAccountabilityContractsForUser} />
        </Segment>
        <br />
        <Segment>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>
              Contracts user referees:
              {openAccountabilityContractAddresses.length}
            </h2>
          </div>
          <ContractsTable contracts={openAccountabilityContractsForReferee} />
        </Segment>
      </Layout>
    </>
  );
};

export default SpecificUser;
