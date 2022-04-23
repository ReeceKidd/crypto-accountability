import React from 'react';
import { Button, Message } from 'semantic-ui-react';
import { Form, Field, FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';

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
      <Form onSubmit={handleSubmit}>
        <Field name="description" label="Description" />
        <Button
          color="blue"
          content="Previous"
          onClick={() => handlePreviousStep()}
        />
        <Button type="submit" color="blue" content="Next" />
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
