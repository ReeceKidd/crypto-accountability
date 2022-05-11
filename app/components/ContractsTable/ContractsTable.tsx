import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { ContractStatus } from '../../helpers/getAccountabilityContractStatus';
import ContractStatusCell from '../ContractStatusCell/ContractStatusCell';

export interface AccountabilityContract {
  address: string;
  name: string;
  status: string;
  amount: string;
}

interface RequestsTableProps {
  contracts: AccountabilityContract[];
}

const ContractsTable = ({ contracts }: RequestsTableProps) => {
  const tableCells = contracts.map(
    ({ address, name, status, amount }, index) => (
      <TableRow key={index}>
        <TableCell>
          <Link href={`/contracts/${address}`}>{name}</Link>
        </TableCell>
        <TableCell>{amount}</TableCell>
        <ContractStatusCell status={status as ContractStatus} />
      </TableRow>
    )
  );

  return (
    <>
      {tableCells.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableCells}</TableBody>
        </Table>
      )}
    </>
  );
};

export default ContractsTable;
