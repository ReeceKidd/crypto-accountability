import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Grid, Message } from "semantic-ui-react";
import ContractsCards from "../../components/ContractCards/ContractCards";
import Layout from "../../components/Layout/Layout";
import { getAccountabilityContract } from "../../factory";
import { useWeb3React } from "@web3-react/core";
import {
  ContractStatus,
  getContractStatus,
} from "../../helpers/getContractStatus";
import ContractStatusMessage from "../../components/ContractStatusMessage/ContractStatusMessage";

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
  status,
}) => {
  const router = useRouter();
  const { address } = router.query;
  const accountabilityContract = getAccountabilityContract(address! as string);
  const [completeContractLoading, setCompleteContractLoading] = useState(false);
  const [failContractLoading, setFailContractLoading] = useState(false);
  const { account } = useWeb3React();
  const completeContract = async () => {
    setCompleteContractLoading(true);
    await accountabilityContract.methods.completeContract().send({
      from: account,
    });
    setCompleteContractLoading(false);
    router.reload();
  };
  const failContract = async () => {
    setFailContractLoading(true);
    await accountabilityContract.methods.completeContract().send({
      from: account,
    });
    setFailContractLoading(false);
    router.reload();
  };
  const getStatusMessage = () => {
    if (status === ContractStatus.SUCCESS) {
      return (
        <Message
          color="green"
          icon="check"
          header="Completed"
          content="You successfully completed this contract."
        />
      );
    }
    if (status === ContractStatus.FAILURE) {
      <Message
        color="red"
        icon="cross"
        header="Failed"
        content="You failed to complete this contract."
      />;
    }
    return (
      <Message
        color="red"
        icon="cross"
        header="Failed"
        content="You failed to complete this contract."
      />
    );
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
          <ContractStatusMessage status={ContractStatus.FAILURE} />
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
      </Grid>
    </Layout>
  );
};

SpecificContract.getInitialProps = async (ctx) => {
  const { address } = ctx.query;
  const accountabilityContract = getAccountabilityContract(address! as string);
  const [
    creator,
    referee,
    name,
    description,
    failureRecipient,
    status,
    amount,
  ] = await Promise.all([
    accountabilityContract.methods.creator().call(),
    accountabilityContract.methods.referee().call(),
    accountabilityContract.methods.name().call(),
    accountabilityContract.methods.description().call(),
    accountabilityContract.methods.failureRecipient().call(),
    accountabilityContract.methods.status().call(),
    accountabilityContract.methods.amount().call(),
  ]);

  return {
    creator,
    referee,
    name,
    description,
    failureRecipient,
    status: getContractStatus(status),
    amount,
  };
};

export default SpecificContract;
