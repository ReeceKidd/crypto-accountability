import { useWeb3React } from "@web3-react/core";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getAccountabilityContract } from "../../factory";
import { getContractStatus } from "../../helpers/getContractStatus";
import ContractsTable from "../ContractsTable/ContractsTable";

interface AccountabilityContractsProps {
  accountabilityContractAddresses: string[];
  setLoading: (loading: boolean) => void;
}

const AccountabilityContracts = ({
  accountabilityContractAddresses,
  setLoading,
}: AccountabilityContractsProps) => {
  const { account } = useWeb3React();
  const getOpenAccountabillityContracts = useCallback(
    async (
      accountabilityContractAddresses: string[],
      setAccountabilityContracts: (
        accountabilityContracts: {
          address: string;
          name: string;
          status: string;
          amount: string;
        }[]
      ) => void
    ) => {
      const openAccountabilityContracts = await Promise.all(
        accountabilityContractAddresses.map(async (address) => {
          const accountabilityContract = getAccountabilityContract(
            address! as string
          );
          const [name, status, amount] = await Promise.all([
            accountabilityContract.methods.name().call(),
            accountabilityContract.methods.status().call(),
            accountabilityContract.methods.amount().call(),
          ]);

          return {
            address,
            name,
            status: getContractStatus(status),
            amount,
          };
        })
      );
      setAccountabilityContracts(openAccountabilityContracts);
    },
    []
  );
  const [
    openAccountabilityContractsForUser,
    setOpenAcccountabilityContractsForUser,
  ] = useState<
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
    setLoading,
  ]);
  return (
    <>
      <ContractsTable contracts={openAccountabilityContractsForUser} />
      <Link href={"/contracts"}>View all contracts</Link>
    </>
  );
};

export default AccountabilityContracts;
