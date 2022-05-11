import React from 'react';
import { Message } from '@mui/material';
import { Form, Field, FormikProps, withFormik } from 'formik';
import FormNavigationButtons from '../../../../FormNavigationButtons/FormNavigationButtons';

interface ContractNameFormProps {
  name: string;
  setName: (name: string) => void;
  handlePreviousStep: () => void;
  handleNextStep: () => void;
}

interface ContractNameFormValues {
  name: string;
}

const ContractNameForm = (
  props: ContractNameFormProps & FormikProps<ContractNameFormValues>
) => {
  const { handlePreviousStep, handleSubmit, errors } = props;
  const nameError = errors.name;

  return (
    <>
      <h2>Contract name</h2>
      <Form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
      >
        <Field name="name" label="Name" />
        <FormNavigationButtons handlePreviousStep={handlePreviousStep} />
      </Form>
      {nameError && (
        <Message negative>
          <Message.Header>Form error</Message.Header>
          <p>{nameError}</p>
        </Message>
      )}
    </>
  );
};

export default withFormik<ContractNameFormProps, ContractNameFormValues>({
  mapPropsToValues: ({ name }) => ({
    name
  }),
  handleSubmit: async ({ name }, { props: { setName, handleNextStep } }) => {
    setName(name);
    handleNextStep();
  }
})(ContractNameForm);
