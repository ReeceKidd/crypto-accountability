import Link from "next/link";
import { List } from "semantic-ui-react";

interface ContractsListProps {
  contracts: { address: string; title: string }[];
}

const ContractsList = ({ contracts }: ContractsListProps) => {
  return (
    <List>
      {contracts.map(({ address, title }, index) => (
        <List.Item key={index}>
          <List.Content>
            <Link href={`/contracts/${address}`} passHref={true}>
              <List.Header
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {title}
              </List.Header>
            </Link>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default ContractsList;
