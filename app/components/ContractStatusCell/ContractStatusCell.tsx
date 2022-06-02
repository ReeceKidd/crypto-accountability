import { TableCell } from '@mui/material';
import { ContractStatus } from '../../helpers/getAccountabilityContractStatus';

export interface ContractStatusCellProps {
  status: ContractStatus;
}

export const ContractStatusCell = ({ status }: ContractStatusCellProps) => {
  if (status === ContractStatus.SUCCESS) {
    return <TableCell style={{ color: 'green' }}>{status}</TableCell>;
  }
  if (status === ContractStatus.AWAITING_APPROVAL) {
    return <TableCell style={{ color: 'blue' }}>{status}</TableCell>;
  }
  if (status === ContractStatus.FAILURE) {
    return <TableCell style={{ color: 'red' }}>{status}</TableCell>;
  }
  return <TableCell style={{ color: 'green' }}>{status}</TableCell>;
};

export default ContractStatusCell;
