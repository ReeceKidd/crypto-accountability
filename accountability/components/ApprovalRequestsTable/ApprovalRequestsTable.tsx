import { useWeb3React } from '@web3-react/core';
import Link from 'next/link';
import { useState } from 'react';
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
  const { account } = useWeb3React();
  const [approveRequestLoading, setApproveRequestLoading] = useState(false);
  console.log(approveRequestLoading);
  const approveRequest = async (contractAddress: string) => {
    setApproveRequestLoading(true);
    try {
      await crowdfundFactoryInstance.methods
        .approveRequest(contractAddress)
        .send({
          from: account,
          gas: 1000000
        });
    } catch (err) {
      console.log('Error', err);
    }
    setApproveRequestLoading(false);
  };
  const [rejectRequestLoading, setRejectRequestLoading] = useState(false);
  const rejectRequest = async (contractAddress: string) => {
    setRejectRequestLoading(true);
    await crowdfundFactoryInstance.methods.rejectRequest(contractAddress).send({
      from: account,
      gas: 3000000
    });
    setRejectRequestLoading(false);
  };
  const tableCells = approvalRequests.map(
    (
      { accountabilityContractAddress, accountabilityContractName, address },
      index
    ) => (
      <Table.Row key={index}>
        <Table.Cell>
          <Link href={`/contracts/${accountabilityContractAddress}`}>
            {accountabilityContractName}
          </Link>
        </Table.Cell>
        <Table.Cell>
          <Button
            color="green"
            content="Approve"
            loading={approveRequestLoading}
            onClick={() => approveRequest(address)}
          />
        </Table.Cell>
        <Table.Cell>
          <Button
            color="red"
            content="Deny"
            loading={rejectRequestLoading}
            onClick={() => rejectRequest(address)}
          />
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
