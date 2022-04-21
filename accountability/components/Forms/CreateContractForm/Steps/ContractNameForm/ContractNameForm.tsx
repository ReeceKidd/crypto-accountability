import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Field, FormikProps, withFormik } from 'formik';
import { SemanticFormikInputField } from '../../../../SemanticUIFormikField/SemanticUIFormikField';

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
  const { handlePreviousStep, handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Field name="name" label="Name" component={SemanticFormikInputField} />
      <Button
        color="blue"
        content="Previous"
        onClick={() => handlePreviousStep}
      />
      <Button type="submit" color="blue" content="Next" />
    </Form>
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
