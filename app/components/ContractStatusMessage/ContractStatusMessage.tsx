import { Card, Typography } from '@mui/material';
import { ContractStatus } from '../../helpers/getAccountabilityContractStatus';

interface ContractStatusMessageProps {
  status: ContractStatus;
}

const ContractStatusMessage = ({ status }: ContractStatusMessageProps) => {
  if (status === ContractStatus.SUCCESS) {
    return (
      <Card variant="outlined">
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          This contract has been completed
        </Typography>
      </Card>
    );
  }

  if (status === ContractStatus.AWAITING_APPROVAL) {
    return (
      <Card variant="outlined">
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Contact the referee to get their approval
        </Typography>
      </Card>
    );
  }
  if (status === ContractStatus.FAILURE) {
    return (
      <Card variant="outlined">
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          This contract has failed
        </Typography>
      </Card>
    );
  }
  return (
    <Card variant="outlined">
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        This contract is open
      </Typography>
    </Card>
  );
};

export default ContractStatusMessage;
