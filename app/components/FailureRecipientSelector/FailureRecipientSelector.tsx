import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { SyntheticEvent, useState } from 'react';
import { FailureRecipientOptions } from '../Forms/CreateContractForm/Steps/FailureRecipientForm/FailureRecipientForm';

export interface FailureRecipientOption {
  title: string;
  description: string;
}

export const FailureRecipientSelector = () => {
  const failureRecipients: {
    [key: string]: FailureRecipientOption;
  } = {
    [FailureRecipientOptions.friendOrEnemy]: {
      title: 'Friend or enemy',
      description: 'If you fail we will send this person the money'
    },
    [FailureRecipientOptions.cryptoAccountability]: {
      title: 'Crypto accountability',
      description:
        'If you fail you will send the money to us. Thank you for the support'
    }
  };
  const [failureRecipientOption, setFailureRecipientOption] = useState<string>(
    FailureRecipientOptions.friendOrEnemy
  );
  const handleChange = (event: SyntheticEvent) => {
    setFailureRecipientOption((event.target as HTMLInputElement).value);
  };
  return (
    <FormControl>
      <FormLabel id="failure-recipient">Failure recipient</FormLabel>
      <RadioGroup
        value={failureRecipientOption}
        defaultValue={failureRecipientOption}
      >
        {Object.keys(failureRecipients).map((failureRecipientKey, index) => (
          <FormControlLabel
            key={index}
            value={failureRecipientKey}
            control={<Radio />}
            label={failureRecipients[failureRecipientKey].title}
            onChange={handleChange}
          />
        ))}
      </RadioGroup>
      <Box mt={2} mb={2}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {failureRecipients[failureRecipientOption].description}
        </Typography>
      </Box>
    </FormControl>
  );
};

export default FailureRecipientSelector;
