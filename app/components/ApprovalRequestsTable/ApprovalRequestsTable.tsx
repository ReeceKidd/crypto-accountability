import { useWeb3React } from '@web3-react/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  TableContainer,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Paper,
  Table
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import accountabilityContractFactoryInstance from '../../factory';

export interface ApprovalRequest {
  address: string;
  creator: string;
  accountabilityContractAddress: string;
  accountabilityContractName: string;
}

interface Props {
  approvalRequests: ApprovalRequest[];
}

const ApprovalRequestsTable = ({ approvalRequests }: Props) => {
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
      <TableRow key={index}>
        <TableCell>
          <Link href={`/contracts/${accountabilityContractAddress}`}>
            {accountabilityContractName}
          </Link>
        </TableCell>
        <TableCell>
          <LoadingButton
            loading={approveRequestLoading}
            onClick={() => approveRequest(address)}
          >
            Approve
          </LoadingButton>
        </TableCell>
        <TableCell>
          <LoadingButton
            loading={rejectRequestLoading}
            onClick={() => rejectRequest(address)}
          >
            Reject
          </LoadingButton>
        </TableCell>
      </TableRow>
    )
  );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Approve</TableCell>
            <TableCell>Reject</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableCells}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default ApprovalRequestsTable;
