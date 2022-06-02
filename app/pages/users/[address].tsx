import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react';
import { Button } from '@mui/material';
import ContractsTable from '../../components/ContractsTable/ContractsTable';
import factory, { getAccountabilityContract } from '../../factory';
import { getAccountabilityContractStatus } from '../../helpers/getAccountabilityContractStatus';

const SpecificUser: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const [
    loadingOpenAccountabilityContractsForUser,
    setLoadingOpenAccountabilityContractsForUser
  ] = useState(false);
  console.log(loadingOpenAccountabilityContractsForUser);
  const getOpenAccountabilityContractAddressesForUser = useCallback(
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
  const getOpenAccountabilityContracts = useCallback(
    async (
      openAccountabilityContractAddresses: string[],
      setAccountabilityContracts: (
        accountabilityContracts: {
          address: string;
          name: string;
          status: string;
          amount: string;
          creator: string;
        }[]
      ) => void,
      setLoadingOpenAccountabilityContracts: Dispatch<SetStateAction<boolean>>
    ) => {
      setLoadingOpenAccountabilityContracts(true);
      const openAccountabilityContracts = await Promise.all(
        openAccountabilityContractAddresses.map(async (address) => {
          const accountabilityContract = getAccountabilityContract(address);
          const [name, status, amount] = await Promise.all([
            accountabilityContract.methods.name().call(),
            accountabilityContract.methods.status().call(),
            accountabilityContract.methods.amount().call(),
            accountabilityContract.methods.creator().call()
          ]);

          return {
            address,
            name,
            status: getAccountabilityContractStatus(status),
            amount,
            creator
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
    setOpenAccountabilityContractAddresses
  ] = useState<string[]>([]);
  const [
    openAccountabilityContractsForUser,
    setOpenAccountabilityContractsForUser
  ] = useState<
    { address: string; name: string; status: string; amount: string }[]
  >([]);
  useEffect(() => {
    getOpenAccountabilityContractAddressesForUser(
      setOpenAccountabilityContractAddresses
    );
  }, [getOpenAccountabilityContractAddressesForUser]);
  useEffect(() => {
    getOpenAccountabilityContracts(
      openAccountabilityContractAddresses,
      setOpenAccountabilityContractsForUser,
      setLoadingOpenAccountabilityContractsForUser
    );
  }, [getOpenAccountabilityContracts, openAccountabilityContractAddresses]);
  const [
    loadingOpenAccountabilityContractsForReferee,
    setLoadingOpenAccountabilityContractsForReferee
  ] = useState(false);
  console.log(loadingOpenAccountabilityContractsForReferee);
  const getOpenAccountabilityContractAddressesForReferee = useCallback(
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
    setOpenAccountabilityContractAddressesForReferee
  ] = useState<string[]>([]);
  const [
    openAccountabilityContractsForReferee,
    setOpenAcccountabilityContractsForReferee
  ] = useState<
    { address: string; name: string; status: string; amount: string }[]
  >([]);
  useEffect(() => {
    getOpenAccountabilityContractAddressesForReferee(
      setOpenAccountabilityContractAddressesForReferee
    );
  }, [getOpenAccountabilityContractAddressesForReferee]);
  useEffect(() => {
    getOpenAccountabilityContracts(
      openAccountabilityContractAddressesForReferee,
      setOpenAcccountabilityContractsForReferee,
      setLoadingOpenAccountabilityContractsForReferee
    );
  }, [
    getOpenAccountabilityContracts,
    getOpenAccountabilityContractAddressesForReferee,
    openAccountabilityContractAddressesForReferee
  ]);
  return (
    <>
      <Head>
        <title>{address}</title>
      </Head>
      <h1>{address}</h1>
      <Link passHref href={`https://rinkeby.etherscan.io/address/${address}`}>
        <Button variant="contained">View on etherscan</Button>
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Open contracts: {openAccountabilityContractAddresses.length}</h2>
      </div>
      <ContractsTable contracts={openAccountabilityContractsForUser} />

      <br />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>
          Contracts user referees:
          {openAccountabilityContractAddresses.length}
        </h2>
      </div>
      <ContractsTable contracts={openAccountabilityContractsForReferee} />
    </>
  );
};

export default SpecificUser;
