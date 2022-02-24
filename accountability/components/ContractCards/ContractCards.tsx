import { Card } from "semantic-ui-react";
import web3 from "../../web3";

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
  console.log("Balance", balance);
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
      description: web3.utils.fromWei(balance, "ether"),
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
