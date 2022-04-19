import { useWeb3React } from '@web3-react/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import CreateContractForm from '../../components/Forms/CreateContractForm/CreateContractForm';
import Layout from '../../components/Layout/Layout';

const NewContract: NextPage = () => {
  const { account } = useWeb3React();
  const [referee, setReferee] = useState('');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [failureRecipient, setFailureRecipient] = useState('');

  return (
    <Layout>
      <Head>
        <title>Create accountability contract</title>
      </Head>
      <h1 style={{ textAlign: 'center' }}>Create accountability contract</h1>

      {account && (
        <CreateContractForm
          web3Account={account}
          referee={referee}
          setReferee={setReferee}
          amount={amount}
          setAmount={setAmount}
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
          failureRecipient={failureRecipient}
          setFailureRecipient={setFailureRecipient}
        />
      )}
    </Layout>
  );
};

export default NewContract;
