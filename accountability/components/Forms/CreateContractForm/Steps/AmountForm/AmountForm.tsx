import React from 'react';
import { Button, Message } from 'semantic-ui-react';
import { Form, Field, FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';

interface AmountFormProps {
  amount: string;
  setAmount: (amount: string) => void;
  handlePreviousStep: () => void;
  handleNextStep: () => void;
}

interface AmountFormValues {
  amount: string;
}

const AmountFormValidationSchema = Yup.object({
  amount: Yup.number()
    .required('Amount is required')
    .typeError('Amount must be a number')
});

const AmountForm = (props: AmountFormProps & FormikProps<AmountFormValues>) => {
  const { handlePreviousStep, handleSubmit, errors } = props;
  const amountError = errors.amount;

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Field name="amount" label="Amount" />
        <Button
          color="blue"
          content="Previous"
          onClick={() => handlePreviousStep()}
        />
        <Button type="submit" color="blue" content="Next" />
      </Form>
      {amountError && (
        <Message negative>
          <Message.Header>Form error</Message.Header>
          <p>{amountError}</p>
        </Message>
      )}
    </>
  );
};

export default withFormik<AmountFormProps, AmountFormValues>({
  mapPropsToValues: ({ amount }) => ({
    amount
  }),
  validationSchema: AmountFormValidationSchema,
  handleSubmit: async (
    { amount },
    { props: { setAmount, handleNextStep } }
  ) => {
    setAmount(amount);
    handleNextStep();
  }
})(AmountForm);
