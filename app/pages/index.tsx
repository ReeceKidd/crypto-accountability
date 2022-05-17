import { useWeb3React } from '@web3-react/core';
import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import ContractsList from '../components/ContractsList/ContractsList';
import OpenAccountabilityContracts from '../components/AccountabilityContracts/AccountabilityContracts';
import UsersList from '../components/UsersList/UsersList';
import factory, { getAccountabilityContract } from '../factory';

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
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [numberOfAccountabilityContracts, setNumberOfAccountabilityContracts] =
    useState(0);
  const getNumberOfUsers = useCallback(
    async (setNumberOfUsers: (users: number) => void) => {
      const numberOfUsers = await factory.methods.numberOfUsers().call();
      setNumberOfUsers(numberOfUsers);
    },
    []
  );
  const getNumberOfContracts = useCallback(
    async (setNumberOfAccountabilityContracts: (contracts: number) => void) => {
      const numberOfAccountabilityContracts = await factory.methods
        .numberOfAccountabilityContracts()
        .call();
      setNumberOfAccountabilityContracts(numberOfAccountabilityContracts);
    },
    []
  );
  useEffect(() => {
    getNumberOfUsers(setNumberOfUsers);
    getNumberOfContracts(setNumberOfAccountabilityContracts);
  }, [getNumberOfUsers, getNumberOfContracts]);
  const [userAddresses, setUserAddresses] = useState<string[]>([]);
  const getUserAddresses = useCallback(
    async (setUserAddresses: (addresses: string[]) => void) => {
      const userAddresses = await factory.methods
        .getUserAddresses(0, numberOfUsers)
        .call();
      setUserAddresses(userAddresses);
    },
    [numberOfUsers]
  );
  useEffect(() => {
    getUserAddresses(setUserAddresses);
  }, [getUserAddresses]);
  const [contracts, setContracts] = useState<
    { address: string; title: string }[]
  >([]);
  const getContracts = useCallback(
    async (
      setContracts: (addresses: { address: string; title: string }[]) => void
    ) => {
      const contractAddresses: string[] = await factory.methods
        .getAccountabilityContractAddresses(0, numberOfAccountabilityContracts)
        .call();
      const contractNames = await Promise.all(
        contractAddresses.map(async (address) => {
          const accountabilityContract = getAccountabilityContract(address);
          const title = await accountabilityContract.methods.name().call();
          return {
            address,
            title
          };
        })
      );
      setContracts(contractNames);
    },
    [numberOfAccountabilityContracts]
  );
  useEffect(() => {
    getContracts(setContracts);
  }, [getContracts]);

  return (
    <div>
      <title>Crypto accountability</title>
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

      <h2>New Users</h2>
      <UsersList userAddresses={userAddresses} />

      <h2>New Contracts</h2>
      <ContractsList contracts={contracts} />
    </div>
  );
};

export default Home;
