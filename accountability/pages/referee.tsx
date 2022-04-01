import { useWeb3React } from '@web3-react/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { Segment } from 'semantic-ui-react';
import AccountabilityContracts from '../components/AccountabilityContracts/AccountabilityContracts';
import Layout from '../components/Layout/Layout';
import factory, { getAccountabilityContractApprovalRequest } from '../factory';

const Referee: NextPage = () => {
  const { account } = useWeb3React();
  const getCompleteAccountabilityContractRequestAddressesForReferee =
    useCallback(
      async (
        setCompleteAccountabilityContractRequestAddresses: (
          addresses: string[]
        ) => void
      ) => {
        if (account) {
          const completeAccountabilityContractRequestAddresses =
            await factory.methods
              .getCompleteAccountabilityContractRequestsForReferee(account)
              .call();
          setCompleteAccountabilityContractRequestAddresses(
            completeAccountabilityContractRequestAddresses
          );
        }
      },
      [account]
    );
  const [
    loadingGetCompleteAccountabilityContractRequestAddressesForReferee,
    setLoadingGetCompleteAccountabilityContractRequestAddressesForReferee
  ] = useState(false);

  const getCompleteAccountabilityContractRequests = useCallback(
    async (
      completeAccountabilityContractRequestAddresses: string[],
      setCompleteAccountabilityContractRequests: (
        completeAccountabilityContractRequests: {
          address: string;
          creator: string;
          referee: string;
          status: string;
        }[]
      ) => void
    ) => {
      setLoadingGetCompleteAccountabilityContractRequestAddressesForReferee(
        true
      );
      const completeAccountabilityContractRequests = await Promise.all(
        completeAccountabilityContractRequestAddresses.map(async (address) => {
          const accountabilityContract =
            getAccountabilityContractApprovalRequest(address);
          const [creator, referee, status] = await Promise.all([
            accountabilityContract.methods.creator().call(),
            accountabilityContract.methods.referee().call(),
            accountabilityContract.methods.status().call()
          ]);
          return {
            address,
            creator,
            referee,
            status
          };
        })
      );
      setCompleteAccountabilityContractRequests(
        completeAccountabilityContractRequests
      );
      setLoadingGetCompleteAccountabilityContractRequestAddressesForReferee(
        false
      );
    },
    []
  );
  const [
    completeAccountabilityContractAddressRequests,
    setCompleteAccountabilityContractRequestAddresses
  ] = useState<string[]>([]);
  useEffect(() => {
    getCompleteAccountabilityContractRequestAddressesForReferee(
      setCompleteAccountabilityContractRequestAddresses
    );
  }, [getCompleteAccountabilityContractRequestAddressesForReferee]);
  const [
    completeAccountabilityContractRequests,
    setCompleteAcccountabilityContractRequests
  ] = useState<
    { address: string; creator: string; referee: string; status: string }[]
  >([]);
  useEffect(() => {
    getCompleteAccountabilityContractRequests(
      completeAccountabilityContractAddressRequests,
      setCompleteAcccountabilityContractRequests
    );
  }, [
    completeAccountabilityContractAddressRequests,
    getCompleteAccountabilityContractRequests
  ]);
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
    setLoadingGetOpenAccountabilityContractsForReferee
  ] = useState(false);
  const [
    openAccountabilityContractAddresses,
    setOpenAccountabilityContractAddresses
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
    setLoadingGetClosedAccountabilityContractsForReferee
  ] = useState(false);
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
        <title>Contracts you referee</title>
      </Head>
      <Layout>
        <Segment
          loading={
            loadingGetCompleteAccountabilityContractRequestAddressesForReferee
          }
        >
          <h2>
            {`Approval requests: ${completeAccountabilityContractAddressRequests.length}`}
          </h2>
          {completeAccountabilityContractRequests.map(
            (item) => `${item.status}`
          )}
        </Segment>
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

export default Referee;
