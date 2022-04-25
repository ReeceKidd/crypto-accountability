import React from 'react';
import { Message } from 'semantic-ui-react';
import { Form, Field, FormikProps, withFormik } from 'formik';
import FormNavigationButtons from '../../../../FormNavigationButtons/FormNavigationButtons';

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

const FailureRecipientForm = (
  props: FailureRecipientFormProps & FormikProps<FailureRecipientFormValues>
) => {
  const { handlePreviousStep, handleSubmit, onSumbitLoading, errors } = props;
  const failureRecipientError = errors.failureRecipient;

  return (
    <>
      <h2>Failure recipient</h2>
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
