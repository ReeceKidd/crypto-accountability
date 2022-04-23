import React from 'react';
import { Button, Message } from 'semantic-ui-react';
import { Form, Field, FormikProps, withFormik } from 'formik';

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
      <Form onSubmit={handleSubmit}>
        <Field name="failureRecipient" label="Failure Recipient" />
        <Button
          color="blue"
          content="Previous"
          onClick={() => handlePreviousStep()}
        />
        <Button
          loading={onSumbitLoading}
          type="submit"
          color="blue"
          content="Next"
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
