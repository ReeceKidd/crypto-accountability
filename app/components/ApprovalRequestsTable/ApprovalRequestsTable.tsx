import { useWeb3React } from '@web3-react/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Table } from 'semantic-ui-react';
import accountabilityContractFactoryInstance from '../../factory';

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
  const router = useRouter();
  const [approveRequestLoading, setApproveRequestLoading] = useState(false);
  const approveRequest = async (contractAddress: string) => {
    setApproveRequestLoading(true);
    await accountabilityContractFactoryInstance.methods
      .approveRequest(contractAddress)
      .send({
        from: account,
        gas: 1000000
      });
    setApproveRequestLoading(false);
    router.reload();
  };
  const [rejectRequestLoading, setRejectRequestLoading] = useState(false);
  const rejectRequest = async (contractAddress: string) => {
    setRejectRequestLoading(true);
    await accountabilityContractFactoryInstance.methods
      .rejectRequest(contractAddress)
      .send({
        from: account,
        gas: 3000000
      });
    setRejectRequestLoading(false);
    router.reload();
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
            content="Reject"
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
              <Table.HeaderCell>Reject</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{tableCells}</Table.Body>
        </Table>
      )}
    </>
  );
};

export default ApprovalRequestsTable;
