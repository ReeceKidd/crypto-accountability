import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import ContractsCards from '../../components/ContractCards/ContractCards';
import Layout from '../../components/Layout/Layout';
import crowdfundFactoryInstance, {
  getAccountabilityContract
} from '../../factory';
import { useWeb3React } from '@web3-react/core';
import {
  ContractStatus,
  getAccountabilityContractStatus
} from '../../helpers/getAccountabilityContractStatus';
import ContractStatusMessage from '../../components/ContractStatusMessage/ContractStatusMessage';

interface SpecificContractProps {
  creator: string;
  referee: string;
  name: string;
  description: string;
  failureRecipient: string;
  amount: string;
  status: string;
}

const SpecificContract: NextPage<SpecificContractProps> = ({
  creator,
  referee,
  name,
  description,
  failureRecipient,
  amount,
  status
}) => {
  const router = useRouter();
  const address = router.query.address as string;
  const accountabilityContract = getAccountabilityContract(address);
  const [completeContractLoading, setCompleteContractLoading] = useState(false);
  const [failContractLoading, setFailContractLoading] = useState(false);
  const { account } = useWeb3React();
  const completeContract = async () => {
    setCompleteContractLoading(true);
    await accountabilityContract.methods.completeContract().send({
      from: account
    });
    setCompleteContractLoading(false);
    router.reload();
  };
  const requestApproval = async (address: string) => {
    setCompleteContractLoading(true);
    await crowdfundFactoryInstance.methods.requestApproval(address).send({
      from: account
    });
    setCompleteContractLoading(false);
    router.reload();
  };
  const failContract = async () => {
    setFailContractLoading(true);
    await accountabilityContract.methods.completeContract().send({
      from: account
    });
    setFailContractLoading(false);
    router.reload();
  };
  return (
    <Layout>
      <Head>
        <title>
          {address}-{name}
        </title>
      </Head>
      <h1>{name}</h1>
      <h2>{description}</h2>
      <br />
      <Grid>
        <Grid.Column width={12}>
          <ContractStatusMessage status={status as ContractStatus} />
          <ContractsCards
            creator={creator}
            referee={referee}
            failureRecipient={failureRecipient}
            amount={amount}
          />
        </Grid.Column>
        {account === referee && status === ContractStatus.OPEN && (
          <Grid.Column width={6}>
            <Button
              positive
              loading={completeContractLoading}
              onClick={() => completeContract()}
            >
              Complete
            </Button>
            <Button
              negative
              loading={failContractLoading}
              onClick={() => failContract()}
            >
              Fail
            </Button>
          </Grid.Column>
        )}
        {account === creator && status === ContractStatus.OPEN && (
          <Grid.Column width={6}>
            <Button
              positive
              loading={completeContractLoading}
              onClick={() => requestApproval(address)}
            >
              Request approval
            </Button>
            <Button
              negative
              loading={failContractLoading}
              onClick={() => failContract()}
            >
              Fail
            </Button>
          </Grid.Column>
        )}
      </Grid>
    </Layout>
  );
};

SpecificContract.getInitialProps = async (ctx) => {
  const address = ctx.query.address as string;
  const accountabilityContract = getAccountabilityContract(address);
  const [
    creator,
    referee,
    name,
    description,
    failureRecipient,
    status,
    amount
  ] = await Promise.all([
    accountabilityContract.methods.creator().call(),
    accountabilityContract.methods.referee().call(),
    accountabilityContract.methods.name().call(),
    accountabilityContract.methods.description().call(),
    accountabilityContract.methods.failureRecipient().call(),
    accountabilityContract.methods.status().call(),
    accountabilityContract.methods.amount().call()
  ]);

  return {
    creator,
    referee,
    name,
    description,
    failureRecipient,
    status: getAccountabilityContractStatus(status),
    amount
  };
};

export default SpecificContract;
