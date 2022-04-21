import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Field, FormikProps, withFormik } from 'formik';
import { SemanticFormikInputField } from '../../../../SemanticUIFormikField/SemanticUIFormikField';

interface AmountFormProps {
  amount: string;
  setAmount: (amount: string) => void;
  handlePreviousStep: () => void;
  handleNextStep: () => void;
}

interface AmountFormValues {
  amount: string;
}

const AmountForm = (props: AmountFormProps & FormikProps<AmountFormValues>) => {
  const { handlePreviousStep, handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="amount"
        label="Amount"
        component={SemanticFormikInputField}
      />
      <Button
        color="blue"
        content="Previous"
        onClick={() => handlePreviousStep}
      />
      <Button type="submit" color="blue" content="Next" />
    </Form>
  );
};

export default withFormik<AmountFormProps, AmountFormValues>({
  mapPropsToValues: ({ amount }) => ({
    amount
  }),
  handleSubmit: async (
    { amount },
    { props: { setAmount, handleNextStep } }
  ) => {
    setAmount(amount);
    handleNextStep();
  }
})(AmountForm);
