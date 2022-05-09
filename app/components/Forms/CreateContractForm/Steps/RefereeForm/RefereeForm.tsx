import React from 'react';
import { Button, Message } from 'semantic-ui-react';
import { Form, Field, FormikProps, withFormik } from 'formik';
import * as Yup from 'yup';

interface RefereeFormProps {
  web3Account: string;
  referee: string;
  setReferee: (referee: string) => void;
  handleNextStep: () => void;
}

interface RefereeFormValues {
  referee: string;
}

const RefereeFormValidationSchema = Yup.object({
  referee: Yup.string()
    .required('Referee is required')
    .matches(/^0x[a-fA-F0-9]{40}$/, 'Referee is not a valid ethereum address')
});

const RefereeForm = (
  props: RefereeFormProps & FormikProps<RefereeFormValues>
) => {
  const { web3Account, handleSubmit, errors, setReferee } = props;
  const refereeError = errors.referee;

  return (
    <>
      <h2>Referee</h2>
      <Form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
      >
        <div style={{ flexDirection: 'row' }}>
          <Field name="referee" label="Referee" style={{ width: '70%' }} />
          <button
            onClick={() => setReferee(web3Account)}
            style={{ width: '20%' }}
          >
            Use my address
          </button>
        </div>
        <Button type="submit" color="blue" content="Next" />
      </Form>
      {refereeError && (
        <Message negative>
          <Message.Header>Form error</Message.Header>
          <p>{refereeError}</p>
        </Message>
      )}
    </>
  );
};

export default withFormik<RefereeFormProps, RefereeFormValues>({
  mapPropsToValues: ({ referee }) => ({
    referee
  }),
  enableReinitialize: true,
  validationSchema: RefereeFormValidationSchema,
  handleSubmit: async (
    { referee },
    { props: { setReferee, handleNextStep } }
  ) => {
    setReferee(referee);
    handleNextStep();
  }
})(RefereeForm);
