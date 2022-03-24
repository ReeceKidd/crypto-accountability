import Link from "next/link";
import { List } from "semantic-ui-react";

interface ContractsListProps {
  contractAddresses: string[];
}

const ContractsList = ({ contractAddresses }: ContractsListProps) => {
  return (
    <List>
      {contractAddresses.map((address, index) => (
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
                {address}
              </List.Header>
            </Link>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default ContractsList;
