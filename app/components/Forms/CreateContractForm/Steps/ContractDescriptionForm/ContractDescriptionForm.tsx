import React from 'react';
import { Message } from 'semantic-ui-react';
import { Form, Field, FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';
import FormNavigationButtons from '../../../../FormNavigationButtons/FormNavigationButtons';

interface ContractDescriptionFormProps {
  description: string;
  setDescription: (description: string) => void;
  handlePreviousStep: () => void;
  handleNextStep: () => void;
}

interface ContractDescriptionFormValues {
  description: string;
}

const ContractDescriptionValidationSchema = Yup.object({
  description: Yup.string().required('Description is required')
});

const ContractDescriptionForm = (
  props: ContractDescriptionFormProps &
    FormikProps<ContractDescriptionFormValues>
) => {
  const { handlePreviousStep, handleSubmit, errors } = props;
  const descriptionError = errors.description;

  return (
    <>
      <h2>Contract description</h2>
      <Form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
      >
        <Field name="description" label="Description" />
        <FormNavigationButtons handlePreviousStep={handlePreviousStep} />
      </Form>
      {descriptionError && (
        <Message negative>
          <Message.Header>Form error</Message.Header>
          <p>{descriptionError}</p>
        </Message>
      )}
    </>
  );
};

export default withFormik<
  ContractDescriptionFormProps,
  ContractDescriptionFormValues
>({
  mapPropsToValues: ({ description }) => ({
    description
  }),
  validationSchema: ContractDescriptionValidationSchema,
  handleSubmit: async (
    { description },
    { props: { setDescription, handleNextStep } }
  ) => {
    setDescription(description);
    handleNextStep();
  }
})(ContractDescriptionForm);
