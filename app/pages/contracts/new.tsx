import { useWeb3React } from '@web3-react/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import CreateContractForm from '../../components/Forms/CreateContractForm/CreateContractForm';
import Layout from '../../components/Layout/Layout';

const NewContract: NextPage = () => {
  const { account } = useWeb3React();

  return (
    <Layout>
      <Head>
        <title>Create accountability contract</title>
      </Head>
      <h1 style={{ textAlign: 'center' }}>Create accountability contract</h1>

      {account && <CreateContractForm web3Account={account} />}
    </Layout>
  );
};

export default NewContract;
