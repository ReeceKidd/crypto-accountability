import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Field, FormikProps, withFormik } from 'formik';
import { SemanticFormikInputField } from '../../../../SemanticUIFormikField/SemanticUIFormikField';

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
  const { handlePreviousStep, handleSubmit, onSumbitLoading } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="failureRecipient"
        label="Failure Recipient"
        component={SemanticFormikInputField}
      />
      <Button
        color="blue"
        content="Previous"
        onClick={() => handlePreviousStep}
      />
      <Button
        loading={onSumbitLoading}
        type="submit"
        color="blue"
        content="Next"
      />
    </Form>
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
