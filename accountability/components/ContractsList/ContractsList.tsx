import { Card } from "semantic-ui-react";

export interface ContractsListItem {
  id: string;
  creator: string;
  name: string;
  description: string;
}
interface ContractsProps {
  contracts: ContractsListItem[];
}

const ContractsList = ({ contracts }: ContractsProps) => {
  return (
    <Card.Group
      items={contracts.map(({ id, creator, name, description }) => ({
        key: id,
        header: name,
        description,
        extra: `Creator: ${creator}`,
        fluid: true,
      }))}
    />
  );
};

export default ContractsList;
