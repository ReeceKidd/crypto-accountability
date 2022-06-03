import { useWeb3React } from '@web3-react/core';
import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import AccountabilityContracts from '../components/AccountabilityContracts/AccountabilityContracts';
import factory from '../factory';

const Home: NextPage = () => {
  const { account } = useWeb3React();
  const [
    loadingOpenAccountabilityContractsForUser,
    setLoadingOpenAccountabilityContractsForUser
  ] = useState(true);
  const [
    openAccountabilityContractAddressesUser,
    setOpenAccountabilityContractAddressesUser
  ] = useState<string[]>([]);
  const getOpenAccountabilityContractAddressesForUser = useCallback(
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
  useEffect(() => {
    getOpenAccountabilityContractAddressesForUser(
      setOpenAccountabilityContractAddressesUser
    );
  }, [getOpenAccountabilityContractAddressesForUser]);
  const [
    loadingOpenAccountabilityContractsReferee,
    setLoadingOpenAccountabilityContractsReferee
  ] = useState(true);
  const [
    openAccountabilityContractAddressesReferee,
    setOpenAccountabilityContractAddressesReferee
  ] = useState<string[]>([]);
  const getOpenAccountabilityContractAddressesReferee = useCallback(
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
  useEffect(() => {
    getOpenAccountabilityContractAddressesReferee(
      setOpenAccountabilityContractAddressesReferee
    );
  }, [getOpenAccountabilityContractAddressesReferee]);
  useState(0);

  return (
    <div>
      <title>Cryptcommit</title>
      <meta
        name="description"
        content="Stay accountability by betting crypto"
      />
      <AccountabilityContracts
        headerText={`Your open contracts: ${openAccountabilityContractAddressesUser.length}`}
        loading={loadingOpenAccountabilityContractsForUser}
        setLoading={setLoadingOpenAccountabilityContractsForUser}
        accountabilityContractAddresses={
          openAccountabilityContractAddressesUser
        }
        isReferee={false}
      />
      <AccountabilityContracts
        headerText={`Contracts you referee: ${openAccountabilityContractAddressesReferee.length}`}
        loading={loadingOpenAccountabilityContractsReferee}
        accountabilityContractAddresses={
          openAccountabilityContractAddressesReferee
        }
        isReferee={true}
        setLoading={setLoadingOpenAccountabilityContractsReferee}
      />
    </div>
  );
};

export default Home;
