import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import { SyntheticEvent } from 'react';
import { FailureRecipientOptions } from '../Forms/CreateContractForm/CreateContractForm';

export interface FailureRecipientOption {
  title: string;
  description: string;
}

export interface Props {
  cryptoAccountabilityAddress: string;
  setFailureRecipient: (failureRecipient: string) => void;
  failureRecipientOption: FailureRecipientOptions;
  setFailureRecipientOption: (option: FailureRecipientOptions) => void;
}

export const FailureRecipientSelector = ({
  failureRecipientOption,
  cryptoAccountabilityAddress,
  setFailureRecipient,
  setFailureRecipientOption
}: Props) => {
  const failureRecipients: {
    [key: string]: FailureRecipientOption;
  } = {
    [FailureRecipientOptions.friendOrEnemy]: {
      title: 'Friend or enemy',
      description: 'If you fail we will send this person the money'
    },
    [FailureRecipientOptions.cryptoAccountability]: {
      title: 'Cryptcommit',
      description:
        'If you fail you will send the money to us. Thank you for the support'
    }
  };
  const handleChange = (event: SyntheticEvent) => {
    const failureRecipientOption = (event.target as HTMLInputElement)
      .value as FailureRecipientOptions;
    failureRecipientOption === FailureRecipientOptions.cryptoAccountability
      ? setFailureRecipient(cryptoAccountabilityAddress)
      : setFailureRecipient('');

    setFailureRecipientOption(failureRecipientOption);
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
