import { Alert, Typography } from '@mui/material';
import { ContractStatus } from '../../helpers/getAccountabilityContractStatus';

interface ContractStatusMessageProps {
  status: ContractStatus;
}

const ContractStatusMessage = ({ status }: ContractStatusMessageProps) => {
  if (status === ContractStatus.SUCCESS) {
    return (
      <Alert severity="success">
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          This contract has been completed
        </Typography>
      </Alert>
    );
  }

  if (status === ContractStatus.AWAITING_APPROVAL) {
    return (
      <Alert severity="info">
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Contact the referee to get their approval
        </Typography>
      </Alert>
    );
  }
  if (status === ContractStatus.FAILURE) {
    return (
      <Alert severity="error">
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          This contract has failed
        </Typography>
      </Alert>
    );
  }
  return (
    <Alert severity="info">
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        This contract is open
      </Typography>
    </Alert>
  );
};

export default ContractStatusMessage;
