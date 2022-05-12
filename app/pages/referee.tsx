import { useWeb3React } from '@web3-react/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import AccountabilityContracts from '../components/AccountabilityContracts/AccountabilityContracts';
import ApprovalRequests from '../components/ApprovalRequests/ApprovalRequests';
import factory from '../factory';

const Referee: NextPage = () => {
  const { account } = useWeb3React();
  const [loadingGetApprovalRequests, setLoadingGetApprovalRequests] =
    useState(false);
  console.log(loadingGetApprovalRequests);
  const getApprovalRequestAddresses = useCallback(
    async (
      setCompleteAccountabilityContractRequestAddresses: (
        addresses: string[]
      ) => void
    ) => {
      if (account) {
        const completeAccountabilityContractRequestAddresses =
          await factory.methods.getApprovalRequests(account).call();
        setCompleteAccountabilityContractRequestAddresses(
          completeAccountabilityContractRequestAddresses
        );
      }
    },
    [account]
  );
  const [approvalRequestAddresses, setApprovalRequestAddresses] = useState<
    string[]
  >([]);
  useEffect(() => {
    getApprovalRequestAddresses(setApprovalRequestAddresses);
  }, [getApprovalRequestAddresses]);
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
  console.log(loadingGetOpenAccountabilityContractForReferees);
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
  console.log(loadingGetClosedAccountabilityContractForReferees);
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

      <h2>{`Approval requests: ${approvalRequestAddresses.length}`}</h2>
      <ApprovalRequests
        setLoading={setLoadingGetApprovalRequests}
        approvalRequestAddresses={approvalRequestAddresses}
      />

      <h2>
        {`Open contracts you referee:
            ${openAccountabilityContractAddresses.length}`}
      </h2>
      <AccountabilityContracts
        setLoading={setLoadingGetOpenAccountabilityContractsForReferee}
        accountabilityContractAddresses={openAccountabilityContractAddresses}
      />

      <h2>
        {`Past contracts you refereed: ${closedAccountabilityContractAddresses.length}`}
      </h2>
      <AccountabilityContracts
        setLoading={setLoadingGetClosedAccountabilityContractsForReferee}
        accountabilityContractAddresses={closedAccountabilityContractAddresses}
      />
    </div>
  );
};

export default Referee;
