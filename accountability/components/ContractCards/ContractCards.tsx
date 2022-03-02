import Link from "next/link";
import { Card } from "semantic-ui-react";
import web3 from "../../web3";

interface ContractCardsProps {
  creator: string;
  referee: string;
  failureRecipient: string;
  amount: string;
  status: string;
}

const ContractCards = ({
  creator,
  referee,
  failureRecipient,
  status,
  amount,
}: ContractCardsProps) => {
  const cards = [
    {
      header: "Status",
      description: status,
      meta: "Status",
    },
    {
      header: "Creator",
      description: (
        <Link href={`https://rinkeby.etherscan.io/address/${creator}`}>
          {creator}
        </Link>
      ),
      meta: "Creator of the contract.",
      raised: true,
      style: { overflowWrap: "break-word" },
    },
    {
      header: "Referee",
      description: (
        <Link href={`https://rinkeby.etherscan.io/address/${referee}`}>
          {referee}
        </Link>
      ),
      meta: "Referee of the contract.",
      raised: true,
      style: { overflowWrap: "break-word" },
    },
    {
      header: "Amount",
      description: web3.utils.fromWei(amount, "ether"),
    },
    {
      header: "Failure recipient",
      description: (
        <Link href={`https://rinkeby.etherscan.io/address/${failureRecipient}`}>
          {failureRecipient}
        </Link>
      ),
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
