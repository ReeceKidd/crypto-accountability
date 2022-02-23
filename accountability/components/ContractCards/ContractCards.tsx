import { Card } from "semantic-ui-react";

interface ContractCardsProps {
  creator: string;
  name: string;
  description: string;
  failureRecipient: string;
  balance: string;
}

const ContractCards = ({
  creator,
  name,
  description,
  failureRecipient,
  balance,
}: ContractCardsProps) => {
  const cards = [
    {
      header: "Creator",
      description: creator,
      meta: "Creator of the contract.",
      raised: true,
      style: { overflowWrap: "break-word" },
    },
    {
      header: "Name",
      description: name,
    },
    {
      header: "Description",
      description,
    },
    {
      header: "Balance",
      description: balance,
    },
    {
      header: "Failure recipient",
      description: failureRecipient,
      meta: "Where the money is sent if contract is failed.",
      raised: true,
      style: { overflowWrap: "break-word" },
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

export default ContractCards;
