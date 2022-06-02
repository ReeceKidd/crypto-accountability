import Link from 'next/link';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { ContractStatus } from '../../helpers/getAccountabilityContractStatus';
import ContractStatusCell from '../ContractStatusCell/ContractStatusCell';
import web3 from '../../web3';

export interface AccountabilityContract {
  address: string;
  name: string;
  status: string;
  amount: string;
  creator: string;
}

interface RequestsTableProps {
  contracts: AccountabilityContract[];
}

const ContractsTable = ({ contracts }: RequestsTableProps) => {
  const tableCells = contracts.map(
    ({ address, name, creator, status, amount }, index) => (
      <Link key={index} href={`/contracts/${address}`} passHref>
        <TableRow
          hover
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell>{name}</TableCell>
          <TableCell>{creator}</TableCell>
          <TableCell>{web3.utils.fromWei(amount, 'ether')}</TableCell>
          <ContractStatusCell status={status as ContractStatus} />
        </TableRow>
      </Link>
    )
  );

  return (
    <>
      {tableCells.length > 0 && (
        <TableContainer elevation={3} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Creator</TableCell>
                <TableCell>Amount (ETH)</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tableCells}</TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default ContractsTable;
