import { Form, Radio } from 'semantic-ui-react';
import { FailureRecipientOptions } from '../Forms/CreateContractForm/Steps/FailureRecipientForm/FailureRecipientForm';

export interface FailureRecipientOption {
  title: string;
  description: string;
  field?: JSX.Element;
}

interface FailureRecipientSelectorProps {
  failureRecipientOption: FailureRecipientOptions;
  failureRecipients: { [key: string]: FailureRecipientOption };
  setFailureRecipientOption: (value: FailureRecipientOptions) => void;
}

export const FailureRecipientSelector = ({
  failureRecipientOption,
  failureRecipients,
  setFailureRecipientOption
}: FailureRecipientSelectorProps) => {
  return (
    <Form>
      {Object.keys(failureRecipients).map((failureRecipientKey, index) => (
        <Form.Field key={index}>
          <Radio
            label={failureRecipients[failureRecipientKey].title}
            name="radioGroup"
            value={failureRecipientKey}
            checked={failureRecipientOption === failureRecipientKey}
            onChange={(_e, { value }) => {
              setFailureRecipientOption(value as FailureRecipientOptions);
            }}
          />
        </Form.Field>
      ))}
      <Form.Field>
        {failureRecipients[failureRecipientOption].description}
      </Form.Field>
    </Form>
  );
};

export default FailureRecipientSelector;
