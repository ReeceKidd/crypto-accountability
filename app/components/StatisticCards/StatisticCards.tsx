import { Card, Typography } from '@mui/material';

interface StatisticCardsProps {
  numberOfUsers: number;
  numberOfAccountabilityContracts: number;
  totalEthInContracts: string;
}

const StatisticCards = ({
  numberOfUsers,
  numberOfAccountabilityContracts,
  totalEthInContracts
}: StatisticCardsProps) => {
  const cards = [
    {
      header: 'Total Users',
      description: numberOfUsers
    },
    {
      header: 'Total Contracts',
      description: numberOfAccountabilityContracts
    },
    {
      header: 'Total Eth in contracts',
      description: totalEthInContracts
    }
  ];
  return (
    <>
      {cards.map(({ header, description }, index) => (
        <Card variant="outlined" key={index}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {header}
          </Typography>
          <Typography variant="h5" component="div">
            {description}
          </Typography>
        </Card>
      ))}
      ;
    </>
  );
};

export default StatisticCards;
