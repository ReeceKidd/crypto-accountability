import React, { useState } from 'react';
import { Message } from 'semantic-ui-react';
import { Form, Field, FormikProps, withFormik } from 'formik';
import FormNavigationButtons from '../../../../FormNavigationButtons/FormNavigationButtons';
import FailureRecipientSelector, {
  FailureRecipientOption
} from '../../../../FailureRecipientSelector/FailureRecipientSelector';

interface FailureRecipientFormProps {
  referee: string;
  name: string;
  description: string;
  failureRecipient: string;
  setFailureRecipient: (failureRecipient: string) => void;
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
    description: 'If you fail we will send this person the money'
  },
  [FailureRecipientOptions.cryptoAccountability]: {
    title: 'Crypto accountability',
    description:
      'If you fail you will send the money to us. Thank you for the support'
  }
};

const FailureRecipientForm = (
  props: FailureRecipientFormProps & FormikProps<FailureRecipientFormValues>
) => {
  const { handlePreviousStep, handleSubmit, onSumbitLoading, errors } = props;
  const failureRecipientError = errors.failureRecipient;

  const [failureRecipient, setFailureRecipient] =
    useState<FailureRecipientOptions>(FailureRecipientOptions.friendOrEnemy);

  return (
    <>
      <h2>Failure recipient</h2>
      <h3>Where does the money go if you do not succeed?</h3>
      <FailureRecipientSelector
        failureRecipient={failureRecipient}
        failureRecipients={failureRecipients}
        setFailureRecipient={setFailureRecipient}
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
        <Field name="failureRecipient" label="Failure Recipient" />
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
  mapPropsToValues: ({ failureRecipient }) => ({
    failureRecipient
  }),
  handleSubmit: async (
    { failureRecipient },
    { props: { name, description, referee, onSubmit } }
  ) => {
    onSubmit({ name, description, referee, failureRecipient });
  }
})(FailureRecipientForm);
