import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { getAccountabilityContract } from '../../factory';
import { getContractStatus } from '../../helpers/getContractStatus';
import ContractsTable from '../ContractsTable/ContractsTable';

interface ApprovalRequestsProps {
  accountabilityContractAddresses: string[];
  setLoading: (loading: boolean) => void;
}

const ApprovalRequests = ({
  accountabilityContractAddresses,
  setLoading
}: ApprovalRequestsProps) => {
  const getOpenAccountabillityContracts = useCallback(
    async (
      accountabilityContractAddresses: string[],
      setApprovalRequests: (
        accountabilityContracts: {
          address: string;
          name: string;
          status: string;
          amount: string;
        }[]
      ) => void
    ) => {
      const openApprovalRequests = await Promise.all(
        accountabilityContractAddresses.map(async (address) => {
          const accountabilityContract = getAccountabilityContract(
            address! as string
          );
          const [name, status, amount] = await Promise.all([
            accountabilityContract.methods.name().call(),
            accountabilityContract.methods.status().call(),
            accountabilityContract.methods.amount().call()
          ]);

          return {
            address,
            name,
            status: getContractStatus(status),
            amount
          };
        })
      );
      setApprovalRequests(openApprovalRequests);
    },
    []
  );
  const [openApprovalRequestsForUser, setOpenAcccountabilityContractsForUser] =
    useState<
      { address: string; name: string; status: string; amount: string }[]
    >([]);
  useEffect(() => {
    setLoading(true);
    getOpenAccountabillityContracts(
      accountabilityContractAddresses,
      setOpenAcccountabilityContractsForUser
    );
    setLoading(false);
  }, [
    accountabilityContractAddresses,
    getOpenAccountabillityContracts,
    setLoading
  ]);
  return (
    <>
      <ContractsTable contracts={openApprovalRequestsForUser} />
      <Link href={'/contracts'}>View all contracts</Link>
    </>
  );
};

export default ApprovalRequests;
