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
  const [
    openAccountabilityContractAddresses,
    setOpenAccountabilityContractAddresses
  ] = useState<string[]>([]);
  const getOpenAccountabilityContractAddresses = useCallback(
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
    getOpenAccountabilityContractAddresses(
      setOpenAccountabilityContractAddresses
    );
  }, [getOpenAccountabilityContractAddresses]);
  const [
    loadingGetClosedAccountabilityContractAddresses,
    setLoadingGetClosedAccountabilityContractAddresses
  ] = useState(false);
  const getClosedAccountabilityContractAddresses = useCallback(
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
    getClosedAccountabilityContractAddresses(
      setClosedAccountabilityContractAddresses
    );
  }, [getClosedAccountabilityContractAddresses]);

  return (
    <div>
      <Head>
        <title>Contracts</title>
      </Head>

      <AccountabilityContracts
        headerText={`Your open contracts: ${openAccountabilityContractAddresses.length}`}
        loading={loadingGetOpenAccountabilityContractAddresses}
        setLoading={setLoadingGetOpenAccountabilityContractAddresses}
        accountabilityContractAddresses={openAccountabilityContractAddresses}
        isReferee={false}
      />
      <AccountabilityContracts
        headerText={`Your closed contracts: ${closedAccountabilityContractAddresses.length}`}
        loading={loadingGetClosedAccountabilityContractAddresses}
        setLoading={setLoadingGetClosedAccountabilityContractAddresses}
        accountabilityContractAddresses={closedAccountabilityContractAddresses}
        isReferee={false}
      />
    </div>
  );
};

export default Contracts;
