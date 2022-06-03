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
    useState(true);
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
  const getOpenAccountabilityContractAddresses = useCallback(
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
  ] = useState(true);
  const [
    openAccountabilityContractAddresses,
    setOpenAccountabilityContractAddresses
  ] = useState<string[]>([]);
  useEffect(() => {
    getOpenAccountabilityContractAddresses(
      setOpenAccountabilityContractAddresses
    );
  }, [getOpenAccountabilityContractAddresses]);
  const getClosedAccountabilityContractAddresses = useCallback(
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
    getClosedAccountabilityContractAddresses(
      setClosedAccountabilityContractAddresses
    );
  }, [getClosedAccountabilityContractAddresses]);

  return (
    <div>
      <Head>
        <title>Contracts you referee</title>
      </Head>
      {approvalRequestAddresses.length > 0 && (
        <>
          <h2>{`Approval requests: ${approvalRequestAddresses.length}`}</h2>
          <ApprovalRequests
            loading={loadingGetApprovalRequests}
            setLoading={setLoadingGetApprovalRequests}
            approvalRequestAddresses={approvalRequestAddresses}
          />
        </>
      )}
      <AccountabilityContracts
        headerText={`Open contracts you referee:
      ${openAccountabilityContractAddresses.length}`}
        loading={loadingGetOpenAccountabilityContractForReferees}
        setLoading={setLoadingGetOpenAccountabilityContractsForReferee}
        accountabilityContractAddresses={openAccountabilityContractAddresses}
        isReferee={true}
      />
      <AccountabilityContracts
        headerText={`Past contracts you refereed: ${closedAccountabilityContractAddresses.length}`}
        loading={loadingGetClosedAccountabilityContractForReferees}
        setLoading={setLoadingGetClosedAccountabilityContractsForReferee}
        accountabilityContractAddresses={closedAccountabilityContractAddresses}
        isReferee={true}
      />
    </div>
  );
};

export default Referee;
