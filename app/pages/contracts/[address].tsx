import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import accountabilityContractFactoryInstance, {
  getAccountabilityContract
} from '../../factory';
import { useWeb3React } from '@web3-react/core';
import {
  ContractStatus,
  getAccountabilityContractStatus
} from '../../helpers/getAccountabilityContractStatus';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import web3 from '../../web3';
import Link from 'next/link';
import { LoadingButton } from '@mui/lab';
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
  console.log(
    creator,
    referee,
    name,
    description,
    failureRecipient,
    amount,
    status
  );
  const router = useRouter();
  const address = router.query.address as string;
  const [completeContractLoading, setCompleteContractLoading] = useState(false);
  const [failContractLoading, setFailContractLoading] = useState(false);
  const { account } = useWeb3React();
  const completeContract = async () => {
    setCompleteContractLoading(true);
    await accountabilityContractFactoryInstance.methods
      .completeOpenAccountabilityContract(address)
      .send({ from: account });
    setCompleteContractLoading(false);
    router.reload();
  };
  const requestApproval = async (address: string) => {
    setCompleteContractLoading(true);
    await accountabilityContractFactoryInstance.methods
      .requestApproval(address)
      .send({
        from: account
      });
    setCompleteContractLoading(false);
    router.reload();
  };
  const failContract = async () => {
    setFailContractLoading(true);
    await accountabilityContractFactoryInstance.methods
      .failOpenAccountabilityContract(address)
      .send({ from: account });
    setFailContractLoading(false);
    router.reload();
  };
  return (
    <Box mt={5}>
      <Typography variant="h2" gutterBottom>
        {name}
      </Typography>
      <Typography variant="h4" gutterBottom>
        {description}
      </Typography>
      <ContractStatusMessage status={status as ContractStatus} />
      <Link href={`/users/${creator}`} passHref>
        <Card sx={{ minWidth: 275, mb: 1 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Creator
            </Typography>
            <Typography variant="h5" component="div">
              {creator}
            </Typography>
          </CardContent>
        </Card>
      </Link>

      <Card sx={{ minWidth: 275, mb: 1 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Referee
          </Typography>
          <Typography variant="h5" component="div">
            {referee}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 275, mb: 1 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Failure recipient
          </Typography>
          <Typography variant="h5" component="div">
            {failureRecipient}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 275, mb: 1 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Amount (eth)
          </Typography>
          <Typography variant="h5" component="div">
            {web3.utils.fromWei(amount, 'ether')}
          </Typography>
        </CardContent>
      </Card>
      {account === referee && status === ContractStatus.OPEN && (
        <Grid container mt={2}>
          <Grid item xs={2}>
            <LoadingButton
              variant="contained"
              color="success"
              loading={completeContractLoading}
              onClick={() => completeContract()}
            >
              Complete
            </LoadingButton>
          </Grid>
          <Grid item xs={2}>
            <LoadingButton
              variant="contained"
              color="error"
              loading={failContractLoading}
              onClick={() => failContract()}
            >
              Fail
            </LoadingButton>
          </Grid>
        </Grid>
      )}
      {account === creator &&
        account !== referee &&
        status === ContractStatus.OPEN && (
          <Grid container mt={2}>
            <Grid item xs={2}>
              <LoadingButton
                variant="contained"
                color="success"
                loading={completeContractLoading}
                onClick={() => requestApproval(address)}
              >
                Request approval
              </LoadingButton>
            </Grid>
            <Grid item xs={2}>
              <LoadingButton
                variant="contained"
                color="error"
                loading={failContractLoading}
                onClick={() => failContract()}
              >
                Fail
              </LoadingButton>
            </Grid>
          </Grid>
        )}
    </Box>
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
