import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import accountabilityContractFactoryInstance, {
  getAccountabilityContract
} from '../../factory';
import { useWeb3React } from '@web3-react/core';
import { getAccountabilityContractStatus } from '../../helpers/getAccountabilityContractStatus';
import { Card, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import web3 from '../../web3';
import Link from 'next/link';

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
  console.log(completeContractLoading);
  const [failContractLoading, setFailContractLoading] = useState(false);
  console.log(failContractLoading);
  const { account } = useWeb3React();
  const completeContract = async () => {
    setCompleteContractLoading(true);
    await accountabilityContractFactoryInstance.methods
      .completeOpenAccountabilityContract(address)
      .send({ from: account });
    setCompleteContractLoading(false);
    router.reload();
  };
  console.log(completeContract);
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
  console.log(requestApproval);
  const failContract = async () => {
    setFailContractLoading(true);
    await accountabilityContractFactoryInstance.methods
      .failOpenAccountabilityContract(address)
      .send({ from: account });
    setFailContractLoading(false);
    router.reload();
  };
  console.log(failContract);
  return (
    <Box mt={5}>
      <Typography variant="h2" gutterBottom>
        {name}
      </Typography>
      <Typography variant="h3" gutterBottom>
        {description}
      </Typography>
      <Link href={`/users/${creator}`} passHref>
        <Card sx={{ minWidth: 275 }}>
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

      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Referee
          </Typography>
          <Typography variant="h5" component="div">
            {referee}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Failure recipient
          </Typography>
          <Typography variant="h5" component="div">
            {failureRecipient}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Amount (eth)
          </Typography>
          <Typography variant="h5" component="div">
            {web3.utils.fromWei(amount, 'ether')}
          </Typography>
        </CardContent>
      </Card>
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
