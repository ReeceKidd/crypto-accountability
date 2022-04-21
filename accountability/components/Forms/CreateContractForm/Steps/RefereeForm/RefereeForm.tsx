import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { Field, FormikProps, withFormik } from 'formik';
import { SemanticFormikInputField } from '../../../../SemanticUIFormikField/SemanticUIFormikField';

interface RefereeFormProps {
  referee: string;
  setReferee: (referee: string) => void;
  handleNextStep: () => void;
}

interface RefereeFormValues {
  referee: string;
}

const RefereeForm = (
  props: RefereeFormProps & FormikProps<RefereeFormValues>
) => {
  const { handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="referee"
        label="Referee"
        component={SemanticFormikInputField}
      />
      <Button type="submit" color="blue" content="Next" />
    </Form>
  );
};

export default withFormik<RefereeFormProps, RefereeFormValues>({
  mapPropsToValues: ({ referee }) => ({
    referee
  }),
  handleSubmit: async (
    { referee },
    { props: { setReferee, handleNextStep } }
  ) => {
    setReferee(referee);
    handleNextStep();
  }
})(RefereeForm);
