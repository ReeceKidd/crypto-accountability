import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Grid } from "semantic-ui-react";
import ContractsCards from "../../components/ContractCards/ContractCards";
import Layout from "../../components/Layout/Layout";
import { getAccountabilityContract } from "../../factory";
import web3 from "../../web3";

interface SpecificContractProps {
  creator: string;
  referee: string;
  name: string;
  description: string;
  failureRecipient: string;
  balance: string;
}

const SpecificContract: NextPage<SpecificContractProps> = ({
  creator,
  referee,
  name,
  description,
  failureRecipient,
  balance,
}) => {
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
    creator,
    referee,
    name,
    description,
    failureRecipient,
    balance,
  };
};

export default SpecificContract;
