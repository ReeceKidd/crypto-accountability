import { Form, Radio } from 'semantic-ui-react';
import { FailureRecipientOptions } from '../Forms/CreateContractForm/Steps/FailureRecipientForm/FailureRecipientForm';

export interface FailureRecipientOption {
  title: string;
  description: string;
}

interface FailureRecipientSelectorProps {
  failureRecipient: FailureRecipientOptions;
  failureRecipients: { [key: string]: FailureRecipientOption };
  setFailureRecipient: (value: FailureRecipientOptions) => void;
}

export const FailureRecipientSelector = ({
  failureRecipient,
  failureRecipients,
  setFailureRecipient
}: FailureRecipientSelectorProps) => {
  return (
    <Form>
      {Object.keys(failureRecipients).map((failureRecipientKey, index) => (
        <Form.Field key={index}>
          <Radio
            label={failureRecipients[failureRecipientKey].title}
            name="radioGroup"
            value={failureRecipientKey}
            checked={failureRecipient === failureRecipientKey}
            onChange={(_e, { value }) =>
              setFailureRecipient(value as FailureRecipientOptions)
            }
          />
        </Form.Field>
      ))}
      <Form.Field>{failureRecipients[failureRecipient].description}</Form.Field>
    </Form>
  );
};

export default FailureRecipientSelector;
