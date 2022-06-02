import { useWeb3React } from '@web3-react/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import CreateContractForm from '../components/Forms/CreateContractForm/CreateContractForm';

const NewContract: NextPage = () => {
  const { account } = useWeb3React();

  return (
    <>
      <Head>
        <title>Create accountability contract</title>
      </Head>
      <h1 style={{ textAlign: 'center' }}>Create accountability contract</h1>
      <CreateContractForm web3Account={account} />
    </>
  );
};

export default NewContract;
