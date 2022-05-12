import { useWeb3React } from '@web3-react/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import AccountabilityContracts from '../components/AccountabilityContracts/AccountabilityContracts';
import factory from '../factory';

const Contracts: NextPage = () => {
  const { account } = useWeb3React();
  const [
    loadingGetOpenAccountabilityContractAddresses,
    setLoadingGetOpenAccountabilityContractAddresses
  ] = useState(false);
  console.log(loadingGetOpenAccountabilityContractAddresses);
  const [
    openAccountabilityContractAddresses,
    setOpenAccountabilityContractAddresses
  ] = useState<string[]>([]);
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
  useEffect(() => {
    getOpenAccountabillityContractAddresses(
      setOpenAccountabilityContractAddresses
    );
  }, [getOpenAccountabillityContractAddresses]);
  const [
    loadingGetClosedAccountabilityContractAddresses,
    setLoadingGetClosedAccountabilityContractAddresses
  ] = useState(false);
  console.log(loadingGetClosedAccountabilityContractAddresses);
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
    closedAccountabilityContractAddresses,
    setClosedAccountabilityContractAddresses
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

      <h2>Open contracts: {openAccountabilityContractAddresses.length}</h2>
      <AccountabilityContracts
        setLoading={setLoadingGetOpenAccountabilityContractAddresses}
        accountabilityContractAddresses={openAccountabilityContractAddresses}
      />

      <h2>Closed contracts: {closedAccountabilityContractAddresses.length}</h2>
      <AccountabilityContracts
        setLoading={setLoadingGetClosedAccountabilityContractAddresses}
        accountabilityContractAddresses={closedAccountabilityContractAddresses}
      />
    </div>
  );
};

export default Contracts;
