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
  name: string;
  description: string;
  failureRecipient: string;
  balance: string;
}

const SpecificContract: NextPage<SpecificContractProps> = ({
  creator,
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
      <h1>{id}</h1>
      <h2>{name}</h2>
      <Grid>
        <Grid.Column width={12}>
          <ContractsCards
            creator={creator}
            name={name}
            description={description}
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
  const [creator, name, description, failureRecipient, balance] =
    await Promise.all([
      accountabilityContract.methods.creator().call(),
      accountabilityContract.methods.name().call(),
      accountabilityContract.methods.description().call(),
      accountabilityContract.methods.failureRecipient().call(),
      web3.eth.getBalance(id! as string),
    ]);
  return {
    creator,
    name,
    description,
    failureRecipient,
    balance,
  };
};

export default SpecificContract;
