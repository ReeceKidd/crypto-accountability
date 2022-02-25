import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import ContractsCards from "../../components/ContractCards/ContractCards";
import Layout from "../../components/Layout/Layout";
import { getAccountabilityContract } from "../../factory";
import web3 from "../../web3";
import { Contract } from "web3-eth-contract";

interface SpecificContractProps {
  accountabilityContract: Contract;
  creator: string;
  referee: string;
  name: string;
  description: string;
  failureRecipient: string;
  balance: string;
}

const SpecificContract: NextPage<SpecificContractProps> = ({
  accountabilityContract,
  creator,
  referee,
  name,
  description,
  failureRecipient,
  balance,
}) => {
  const [completeContractLoading, setCompleteContractLoading] = useState(false);
  const [failContractLoading, setFailContractLoading] = useState(false);
  const getAccounts = async (setAccounts: (accounts: string[]) => void) => {
    const accounts = await web3.eth.getAccounts();
    setAccounts(accounts);
  };
  const [accounts, setAccounts] = useState<string[]>([]);
  useEffect(() => {
    getAccounts(setAccounts);
  }, []);
  const completeContract = async () => {
    setCompleteContractLoading(true);
    await accountabilityContract.methods.completeContract().send({
      from: accounts[0],
    });
    setCompleteContractLoading(false);
  };
  const failContract = async () => {
    setFailContractLoading(true);
    await accountabilityContract.methods.completeContract().send({
      from: accounts[0],
    });
    setFailContractLoading(false);
  };
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout>
      <Head>
        <title>
          {id}-{name}
        </title>
      </Head>
      <h1>{name}</h1>
      <h2>{description}</h2>
      <br />
      <Grid>
        <Grid.Column width={12}>
          <ContractsCards
            creator={creator}
            referee={referee}
            failureRecipient={failureRecipient}
            balance={balance}
          />
        </Grid.Column>
        {accounts[0] === referee && (
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
  const { id } = ctx.query;
  const accountabilityContract = getAccountabilityContract(id! as string);
  const [creator, referee, name, description, failureRecipient, balance] =
    await Promise.all([
      accountabilityContract.methods.creator().call(),
      accountabilityContract.methods.referee().call(),
      accountabilityContract.methods.name().call(),
      accountabilityContract.methods.description().call(),
      accountabilityContract.methods.failureRecipient().call(),
      web3.eth.getBalance(id! as string),
    ]);
  return {
    accountabilityContract,
    creator,
    referee,
    name,
    description,
    failureRecipient,
    balance,
  };
};

export default SpecificContract;
