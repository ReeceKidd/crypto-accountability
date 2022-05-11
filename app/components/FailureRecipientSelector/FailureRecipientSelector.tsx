import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import { FailureRecipientOptions } from '../Forms/CreateContractForm/Steps/FailureRecipientForm/FailureRecipientForm';

export interface FailureRecipientOption {
  title: string;
  description: string;
}

interface FailureRecipientSelectorProps {
  failureRecipientOption: FailureRecipientOptions;
  failureRecipients: { [key: string]: FailureRecipientOption };
}

export const FailureRecipientSelector = ({
  failureRecipientOption,
  failureRecipients
}: FailureRecipientSelectorProps) => {
  return (
    <FormControl>
      <RadioGroup>
        {Object.keys(failureRecipients).map((failureRecipientKey, index) => (
          <FormControlLabel
            key={index}
            value={failureRecipientKey}
            control={<Radio />}
            label={failureRecipientKey}
          />
        ))}
      </RadioGroup>
      <FormLabel>
        {failureRecipients[failureRecipientOption].description}
      </FormLabel>
    </FormControl>
  );
};

export default FailureRecipientSelector;
