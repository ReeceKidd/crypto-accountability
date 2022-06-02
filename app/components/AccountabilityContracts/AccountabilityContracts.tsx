import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { getAccountabilityContract } from '../../factory';
import { getAccountabilityContractStatus } from '../../helpers/getAccountabilityContractStatus';
import ContractsTable from '../ContractsTable/ContractsTable';

interface AccountabilityContractsProps {
  accountabilityContractAddresses: string[];
  setLoading: (loading: boolean) => void;
}

const AccountabilityContracts = ({
  accountabilityContractAddresses,
  setLoading
}: AccountabilityContractsProps) => {
  const getOpenAccountabillityContracts = useCallback(
    async (
      accountabilityContractAddresses: string[],
      setAccountabilityContracts: (
        accountabilityContracts: {
          address: string;
          creator: string;
          name: string;
          status: string;
          amount: string;
        }[]
      ) => void
    ) => {
      const openAccountabilityContracts = await Promise.all(
        accountabilityContractAddresses.map(async (address) => {
          const accountabilityContract = getAccountabilityContract(address);
          const [name, creator, status, amount] = await Promise.all([
            accountabilityContract.methods.name().call(),
            accountabilityContract.methods.creator().call(),
            accountabilityContract.methods.status().call(),
            accountabilityContract.methods.amount().call()
          ]);

          return {
            address,
            name,
            creator,
            status: getAccountabilityContractStatus(status),
            amount
          };
        })
      );
      setAccountabilityContracts(openAccountabilityContracts);
    },
    []
  );
  const [
    openAccountabilityContractsForUser,
    setOpenAcccountabilityContractsForUser
  ] = useState<
    {
      address: string;
      name: string;
      creator: string;
      status: string;
      amount: string;
    }[]
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
      <ContractsTable contracts={openAccountabilityContractsForUser} />
      <br />
      <Link href={'/contracts'}>View all contracts</Link>
    </>
  );
};

export default AccountabilityContracts;
