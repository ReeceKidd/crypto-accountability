import React from 'react';
import { Button, Message } from 'semantic-ui-react';
import { Form, Field, FormikProps, withFormik } from 'formik';

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
      <Form onSubmit={handleSubmit}>
        <Field name="name" label="Name" />
        <Button
          color="blue"
          content="Previous"
          onClick={() => handlePreviousStep()}
        />
        <Button type="submit" color="blue" content="Next" />
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
