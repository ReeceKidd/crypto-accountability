import Link from 'next/link';
import { Card, CardContent, Typography } from '@mui/material';
import { Fragment } from 'react';

interface ContractCardsProps {
  creator: string;
  referee: string;
  failureRecipient: string;
  amount: string;
}

const ContractCards = ({
  creator,
  referee,
  failureRecipient,
  amount
}: ContractCardsProps) => {
  const cards = [
    {
      header: 'Creator',
      description: <Link href={`/users/${creator}`}>{creator}</Link>,
      meta: 'Creator of the contract.'
    },
    {
      header: 'Referee',
      description: <Link href={`/users/${referee}`}>{referee}</Link>,
      meta: 'Referee of the contract.'
    },
    {
      header: 'Amount',
      description: amount
    },
    {
      header: 'Failure recipient',
      description: (
        <Link href={`https://rinkeby.etherscan.io/address/${failureRecipient}`}>
          {failureRecipient}
        </Link>
      ),
      meta: 'Where the money is sent if contract is failed.'
    }
  ];
  return (
    <Fragment>
      {cards.map(({ header, description, meta }) => {
        <Card variant="outlined">
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {header}
            </Typography>
            <Typography variant="h5" component="div">
              {description}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {meta}
            </Typography>
          </CardContent>
        </Card>;
      })}
    </Fragment>
  );
};

export default ContractCards;
