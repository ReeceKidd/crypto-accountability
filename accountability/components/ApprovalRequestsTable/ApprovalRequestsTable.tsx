import { Button, Table } from 'semantic-ui-react';
import crowdfundFactoryInstance from '../../factory';

export interface ApprovalRequest {
  address: string;
  creator: string;
  accountabilityContractAddress: string;
  accountabilityContractName: string;
}

interface RequestsTableProps {
  approvalRequests: ApprovalRequest[];
}

const ApprovalRequestsTable = ({ approvalRequests }: RequestsTableProps) => {
  const approveRequest = async (contractAddress: string) => {
    await crowdfundFactoryInstance.methods.approveRequest(contractAddress);
  };
  const tableCells = approvalRequests.map(
    ({ accountabilityContractAddress, accountabilityContractName }, index) => (
      <Table.Row key={index}>
        <Table.Cell>{accountabilityContractName}</Table.Cell>
        <Table.Cell>{accountabilityContractAddress}</Table.Cell>
        <Table.Cell>
          <Button
            color="green"
            content="Approve"
            onClick={() => approveRequest(accountabilityContractAddress)}
          />
        </Table.Cell>
        <Table.Cell>
          <Button color="red" content="Deny" />
        </Table.Cell>
      </Table.Row>
    )
  );

  return (
    <>
      {tableCells.length > 0 && (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Contract</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Approve</Table.HeaderCell>
              <Table.HeaderCell>Deny</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{tableCells}</Table.Body>
        </Table>
      )}
    </>
  );
};

export default ApprovalRequestsTable;
