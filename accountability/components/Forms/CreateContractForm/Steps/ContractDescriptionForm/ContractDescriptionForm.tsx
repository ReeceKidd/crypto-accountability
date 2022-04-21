import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Field, FormikProps, withFormik } from 'formik';
import { SemanticFormikInputField } from '../../../../SemanticUIFormikField/SemanticUIFormikField';

interface ContractDescriptionFormProps {
  description: string;
  setDescription: (description: string) => void;
  handlePreviousStep: () => void;
  handleNextStep: () => void;
}

interface ContractDescriptionFormValues {
  description: string;
}

const ContractDescriptionForm = (
  props: ContractDescriptionFormProps &
    FormikProps<ContractDescriptionFormValues>
) => {
  const { handlePreviousStep, handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="description"
        label="Description"
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

export default withFormik<
  ContractDescriptionFormProps,
  ContractDescriptionFormValues
>({
  mapPropsToValues: ({ description }) => ({
    description
  }),
  handleSubmit: async (
    { description },
    { props: { setDescription, handleNextStep } }
  ) => {
    setDescription(description);
    handleNextStep();
  }
})(ContractDescriptionForm);
