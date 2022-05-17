import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import FailureRecipientSelector from '../../../../FailureRecipientSelector/FailureRecipientSelector';
import FormNavigationButtons from '../../../../FormNavigationButtons/FormNavigationButtons';

export enum FailureRecipientOptions {
  friendOrEnemy = 'friendOrEnemy',
  cryptoAccountability = 'cryptoAccountability'
}

interface FailureRecipientFormProps {
  cryptoAccountabilityAddress: string;
  handlePreviousStep: () => void;
  onSubmit: ({
    failureRecipient
  }: {
    failureRecipient: string;
  }) => Promise<void>;
  onSubmitLoading: boolean;
}

const validationSchema = Yup.object({
  failureRecipient: Yup.string()
    .required('failureRecipient is required')
    .typeError('failureRecipient must be a number')
});

const FailureRecipientForm = ({
  handlePreviousStep,
  onSubmit
}: FailureRecipientFormProps) => {
  const formik = useFormik({
    initialValues: { failureRecipient: '' },
    validationSchema,
    onSubmit: ({ failureRecipient }) => {
      onSubmit({ failureRecipient });
    }
  });

  return (
    <>
      <h2>Failure recipient</h2>
      <FailureRecipientSelector />
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="failureRecipient"
          name="failureRecipient"
          value={formik.values.failureRecipient}
          onChange={formik.handleChange}
          error={
            formik.touched.failureRecipient &&
            Boolean(formik.errors.failureRecipient)
          }
          helperText={
            formik.touched.failureRecipient && formik.errors.failureRecipient
          }
        />
        <FormNavigationButtons handlePreviousStep={handlePreviousStep} />
      </form>
    </>
  );
};

export default FailureRecipientForm;
