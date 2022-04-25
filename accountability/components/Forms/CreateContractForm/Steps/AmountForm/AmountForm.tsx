import React from 'react';
import { Message } from 'semantic-ui-react';
import { Form, Field, FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';
import FormNavigationButtons from '../../../../FormNavigationButtons/FormNavigationButtons';

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
      <h2> Amount</h2>
      <Form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
      >
        <Field name="amount" label="Amount" />
        <FormNavigationButtons handlePreviousStep={handlePreviousStep} />
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
