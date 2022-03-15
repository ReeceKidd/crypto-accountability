import { useWeb3React } from "@web3-react/core";
import type { NextPage } from "next";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import ContractsTable from "../components/ContractsTable/ContractsTable";
import Layout from "../components/Layout/Layout";
import factory, { getAccountabilityContract } from "../factory";
import { getContractStatus } from "../helpers/getContractStatus";


const Home: NextPage = () => {
  const { account } = useWeb3React();
  const getOpenAccountabillityContractAddresses = useCallback(
    async (
      setAccountabilityContractAddresses: (addresses: string[]) => void
    ) => {
      if (account) {
        const openAccountabilityContractAddresses = await factory.methods
          .getOpenAccountabilityContractAddresses(account)
          .call();
        setAccountabilityContractAddresses(openAccountabilityContractAddresses);
      }
    },
    [account]
  );
  const getOpenAccountabillityContracts = useCallback(
    async (
      openAccountabilityContractAddresses: string[],
      setAccountabilityContracts: (
        accountabilityContracts: {
          id: string;
          name: string;
          status: string;
          amount: string;
        }[]
      ) => void
    ) => {
      const openAccountabilityContracts = await Promise.all(
        openAccountabilityContractAddresses.map(async (address) => {
          const id = await factory.methods
            .getOpenAccountabilityContract(account, address)
            .call({ from: account });
          const accountabilityContract = getAccountabilityContract(
            id! as string
          );
          const [name, status, amount] = await Promise.all([
            accountabilityContract.methods.name().call(),
            accountabilityContract.methods.status().call(),
            accountabilityContract.methods.amount().call(),
          ]);

          return { id, name, status: getContractStatus(status), amount };
        })
      );
      setAccountabilityContracts(openAccountabilityContracts);
    },
    [account]
  );
  const [
    openAccountabilityContractAddresses,
    setOpenAccountabilityContractAddresses,
  ] = useState<string[]>([]);
  const [openAccountabilityContracts, setOpenAcccountabilityContracts] =
    useState<{ id: string; name: string; status: string; amount: string }[]>(
      []
    );
  useEffect(() => {
    getOpenAccountabillityContractAddresses(
      setOpenAccountabilityContractAddresses
    );
  }, [getOpenAccountabillityContractAddresses]);
  useEffect(() => {
    getOpenAccountabillityContracts(
      openAccountabilityContractAddresses,
      setOpenAcccountabilityContracts
    );
  }, [getOpenAccountabillityContracts, openAccountabilityContractAddresses]);
  return (
    <div>
      <title>Crypto accountability</title>
      <meta
        name="description"
        content="Stay accountability by betting crypto"
      />
      <Layout>
        <h1 className="text-3xl font-bold underline">Crypto accountability</h1>
        <h2>Create crypto accountability contracts.</h2>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>Open contracts: {openAccountabilityContractAddresses.length} </h1>
          <Link href={"contracts/new"} passHref={true}>
            <Button primary icon="plus" content="Create contract" />
          </Link>
        </div>
        <ContractsTable
          loading={false}
          contracts={openAccountabilityContracts}
        />
        <Link href={"/contracts"}>View all contracts</Link>
      </Layout>
    </div>
  );
};

export default Home;
