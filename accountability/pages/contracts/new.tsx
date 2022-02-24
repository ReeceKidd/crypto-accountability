import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import CreateContractForm from "../../components/CreateContractForm/CreateContractForm";
import Layout from "../../components/Layout/Layout";
import web3 from "../../web3";

const NewContract: NextPage = () => {
  const getAccounts = async (setAccounts: (accounts: string[]) => void) => {
    const accounts = await web3.eth.getAccounts();
    setAccounts(accounts);
  };
  const [accounts, setAccounts] = useState<string[]>([]);
  useEffect(() => {
    getAccounts(setAccounts);
  }, []);
  const [referee, setReferee] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [failureRecipient, setFailureRecipient] = useState("");

  return (
    <Layout>
      <Head>
        <title>Create contract</title>
      </Head>
      <h1>Create contract</h1>
      <CreateContractForm
        web3Account={accounts[0]}
        referee={referee}
        setReferee={setReferee}
        name={name}
        setName={setName}
        description={description}
        setDescription={setDescription}
        failureRecipient={failureRecipient}
        setFailureRecipient={setFailureRecipient}
      />
    </Layout>
  );
};

export default NewContract;
