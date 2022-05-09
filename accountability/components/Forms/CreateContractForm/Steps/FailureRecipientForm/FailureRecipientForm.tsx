import React from 'react';
import { Message } from 'semantic-ui-react';
import { Form, Field, FormikProps, withFormik } from 'formik';
import FormNavigationButtons from '../../../../FormNavigationButtons/FormNavigationButtons';
import FailureRecipientSelector, {
  FailureRecipientOption
} from '../../../../FailureRecipientSelector/FailureRecipientSelector';

interface FailureRecipientFormProps {
  cryptoAccountabilityAddress: string;
  referee: string;
  name: string;
  description: string;
  failureRecipientOption: FailureRecipientOptions;
  setFailureRecipientOption: (
    failureRecipientOption: FailureRecipientOptions
  ) => void;
  handlePreviousStep: () => void;
  onSubmit: ({
    referee,
    name,
    description,
    failureRecipient
  }: {
    referee: string;
    name: string;
    description: string;
    failureRecipient: string;
  }) => Promise<void>;
  onSumbitLoading: boolean;
}

interface FailureRecipientFormValues {
  failureRecipient: string;
}

export enum FailureRecipientOptions {
  friendOrEnemy = 'friendOrEnemy',
  cryptoAccountability = 'cryptoAccountability'
}

const failureRecipients: {
  [key: string]: FailureRecipientOption;
} = {
  [FailureRecipientOptions.friendOrEnemy]: {
    title: 'Friend or enemy',
    description: 'If you fail we will send this person the money',
    field: <Field name="failureRecipient" label="Failure Recipient" />
  },
  [FailureRecipientOptions.cryptoAccountability]: {
    title: 'Crypto accountability',
    description:
      'If you fail you will send the money to us. Thank you for the support',
    field: <Field name="failureRecipient" label="Crypto accountability" />
  }
};

const FailureRecipientForm = (
  props: FailureRecipientFormProps & FormikProps<FailureRecipientFormValues>
) => {
  const {
    failureRecipientOption,
    setFailureRecipientOption,
    handlePreviousStep,
    handleSubmit,
    onSumbitLoading,
    errors
  } = props;
  const failureRecipientError = errors.failureRecipient;

  return (
    <>
      <h2>Failure recipient</h2>
      <h3>Where does the money go if you do not succeed?</h3>
      <FailureRecipientSelector
        failureRecipientOption={failureRecipientOption}
        failureRecipients={failureRecipients}
        setFailureRecipientOption={setFailureRecipientOption}
      />
      <br />
      <Form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          e.preventDefault();
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
      >
        {[failureRecipients[failureRecipientOption].field]}
        <FormNavigationButtons
          handlePreviousStep={handlePreviousStep}
          onSubmitLoading={onSumbitLoading}
        />
      </Form>
      {failureRecipientError && (
        <Message negative>
          <Message.Header>Form error</Message.Header>
          <p>{failureRecipientError}</p>
        </Message>
      )}
    </>
  );
};

export default withFormik<
  FailureRecipientFormProps,
  FailureRecipientFormValues
>({
  handleSubmit: async ({ failureRecipient }, { props }) => {
    const {
      cryptoAccountabilityAddress,
      name,
      description,
      referee,
      failureRecipientOption,
      onSubmit
    } = props;
    onSubmit({
      name,
      description,
      referee,
      failureRecipient:
        failureRecipientOption === FailureRecipientOptions.cryptoAccountability
          ? cryptoAccountabilityAddress
          : failureRecipient
    });
  }
})(FailureRecipientForm);
