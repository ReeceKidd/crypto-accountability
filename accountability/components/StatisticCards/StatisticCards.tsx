import { Card } from "semantic-ui-react";
import web3 from "../../web3";

interface StatisticCardsProps {
  numberOfUsers: number;
  numberOfAccountabilityContracts: number;
  totalEthInContracts: string;
}

const StatisticCards = ({
  numberOfUsers,
  numberOfAccountabilityContracts,
  totalEthInContracts,
}: StatisticCardsProps) => {
  const cards = [
    {
      header: "Total Users",
      description: numberOfUsers,
      raised: true,
    },
    {
      header: "Total Contracts",
      description: numberOfAccountabilityContracts,
      raised: true,
    },
    {
      header: "Total Eth in contracts",
      description: web3.utils.fromWei(totalEthInContracts),
      raised: true,
    },
  ];
  return (
    <Card.Group
      items={cards.map((card, index) => ({
        ...card,
        key: index,
      }))}
    />
  );
};

export default StatisticCards;
