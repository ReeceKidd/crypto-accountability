import Link from "next/link";
import { Button, Table } from "semantic-ui-react";
import web3 from "../../web3";

export interface AccountabilityContract {
  id: string;
  name: string;
  status: string;
  amount: string;
}

interface RequestsTableProps {
  contracts: AccountabilityContract[];
}

const ContractsTable = ({ contracts }: RequestsTableProps) => {
  const tableCells = contracts.map(({ id, name, status, amount }, index) => (
    <Table.Row key={index}>
      <Table.Cell>
        <Link href={`/contracts/${id}`}>{name}</Link>
      </Table.Cell>
      <Table.Cell>{web3.utils.fromWei(amount)}</Table.Cell>
      <Table.Cell>{status}</Table.Cell>
      <Table.Cell></Table.Cell>
    </Table.Row>
  ));

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Amount</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{tableCells}</Table.Body>
    </Table>
  );
};

export default ContractsTable;
