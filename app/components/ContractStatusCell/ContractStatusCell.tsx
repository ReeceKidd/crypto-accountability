import { TableCell } from '@mui/material';
import { ContractStatus } from '../../helpers/getAccountabilityContractStatus';

export interface ContractStatusCellProps {
  status: ContractStatus;
}

export const ContractStatusCell = ({ status }: ContractStatusCellProps) => {
  if (status === ContractStatus.SUCCESS) {
    return <TableCell>{status}</TableCell>;
  }
  if (status === ContractStatus.AWAITING_APPROVAL) {
    return <TableCell>{status}</TableCell>;
  }
  if (status === ContractStatus.FAILURE) {
    return <TableCell>{status}</TableCell>;
  }
  return <TableCell>{status}</TableCell>;
};

export default ContractStatusCell;
