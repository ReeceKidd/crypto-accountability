import { Add } from '@mui/icons-material';
import { Button, CircularProgress } from '@mui/material';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { getAccountabilityContract } from '../../factory';
import { getAccountabilityContractStatus } from '../../helpers/getAccountabilityContractStatus';
import ContractsTable from '../ContractsTable/ContractsTable';

interface Props {
  headerText: string;
  accountabilityContractAddresses: string[];
  loading: boolean;
  isReferee: boolean;
  setLoading: (loading: boolean) => void;
}

const AccountabilityContracts = ({
  headerText,
  accountabilityContractAddresses,
  loading,
  isReferee,
  setLoading
}: Props) => {
  const getOpenAccountabilityContracts = useCallback(
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
    setOpenAccountabilityContractsForUser
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
    getOpenAccountabilityContracts(
      accountabilityContractAddresses,
      setOpenAccountabilityContractsForUser
    );
    setLoading(false);
  }, [
    accountabilityContractAddresses,
    getOpenAccountabilityContracts,
    setLoading
  ]);
  return loading ? (
    <CircularProgress />
  ) : (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2>{headerText}</h2>
        {accountabilityContractAddresses.length === 0 && (
          <Button href="/new" variant="contained" style={{ marginLeft: 5 }}>
            <Add />
          </Button>
        )}
      </div>
      <ContractsTable
        contracts={openAccountabilityContractsForUser}
        isReferee={isReferee}
      />
      <br />
      <Link href={'/contracts'}>View all contracts</Link>
    </>
  );
};

export default AccountabilityContracts;
