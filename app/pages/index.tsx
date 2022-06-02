import { useWeb3React } from '@web3-react/core';
import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import OpenAccountabilityContracts from '../components/AccountabilityContracts/AccountabilityContracts';
import factory from '../factory';

const Home: NextPage = () => {
  const { account } = useWeb3React();
  const [
    loadingOpenAccountabilityContractsForUser,
    setLoadingOpenAccountabilityContractsForUser
  ] = useState(false);
  console.log(loadingOpenAccountabilityContractsForUser);
  const [
    openAccountabilityContractAddressesUser,
    setOpenAccountabilityContractAddressesUser
  ] = useState<string[]>([]);
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
  useEffect(() => {
    getOpenAccountabillityContractAddressesForUser(
      setOpenAccountabilityContractAddressesUser
    );
  }, [getOpenAccountabillityContractAddressesForUser]);
  const [
    loadingOpenAccountabilityContractsReferee,
    setLoadingOpenAccountabilityContractsReferee
  ] = useState(false);
  console.log(loadingOpenAccountabilityContractsReferee);
  const [
    openAccountabilityContractAddressesReferee,
    setOpenAccountabilityContractAddressesReferee
  ] = useState<string[]>([]);
  const getOpenAccountabillityContractAddressesReferee = useCallback(
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
    getOpenAccountabillityContractAddressesReferee(
      setOpenAccountabilityContractAddressesReferee
    );
  }, [getOpenAccountabillityContractAddressesReferee]);
  useState(0);

  return (
    <div>
      <title>Cryptcommit</title>
      <meta
        name="description"
        content="Stay accountability by betting crypto"
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>
          Your open contracts:
          {openAccountabilityContractAddressesUser.length}
        </h2>
      </div>
      <OpenAccountabilityContracts
        accountabilityContractAddresses={
          openAccountabilityContractAddressesUser
        }
        setLoading={setLoadingOpenAccountabilityContractsForUser}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>
          Contracts you referee:
          {openAccountabilityContractAddressesReferee.length}
        </h2>
      </div>
      <OpenAccountabilityContracts
        accountabilityContractAddresses={
          openAccountabilityContractAddressesReferee
        }
        setLoading={setLoadingOpenAccountabilityContractsReferee}
      />
    </div>
  );
};

export default Home;
