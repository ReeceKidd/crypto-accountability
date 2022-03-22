import Link from "next/link";
import { Card } from "semantic-ui-react";
import web3 from "../../web3";

interface StatisticCardsProps {
  numberOfUsers: number;
  numberOfContracts: number;
  totalEthInContracts: string;
}

const StatisticCards = ({
  numberOfUsers,
  numberOfContracts,
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
      description: numberOfContracts,
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
