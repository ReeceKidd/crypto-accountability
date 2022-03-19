import Link from "next/link";
import { Button, Dimmer, Loader, Segment, Table } from "semantic-ui-react";
import web3 from "../../web3";

export interface AccountabilityContract {
  address: string;
  name: string;
  status: string;
  amount: string;
}

interface RequestsTableProps {
  loading: boolean;
  contracts: AccountabilityContract[];
}

const ContractsTable = ({ loading, contracts }: RequestsTableProps) => {
  const tableCells = contracts.map(
    ({ address, name, status, amount }, index) => (
      <Table.Row key={index}>
        <Table.Cell>
          <Link href={`/contracts/${address}`}>{name}</Link>
        </Table.Cell>
        <Table.Cell>{web3.utils.fromWei(amount)}</Table.Cell>
        <Table.Cell>{status}</Table.Cell>
      </Table.Row>
    )
  );

  return loading ? (
    <Loader inline="centered" active={loading} size="medium">
      Loading
    </Loader>
  ) : (
    <>
      {tableCells.length > 0 && (
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
      )}
    </>
  );
};

export default ContractsTable;
