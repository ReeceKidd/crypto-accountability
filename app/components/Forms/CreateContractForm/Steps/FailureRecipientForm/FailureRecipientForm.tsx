import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';

export enum FailureRecipientOptions {
  friendOrEnemy = 'friendOrEnemy',
  cryptoAccountability = 'cryptoAccountability'
}

interface FailureRecipientFormProps {
  failureRecipient: string;
  setFailureRecipient: (failureRecipient: string) => void;
  handlePreviousStep: () => void;
  handleNextStep: () => void;
}

const validationSchema = Yup.object({
  failureRecipient: Yup.string()
    .required('failureRecipient is required')
    .typeError('failureRecipient must be a number')
});

const FailureRecipientForm = ({
  failureRecipient,
  setFailureRecipient
}: FailureRecipientFormProps) => {
  const formik = useFormik({
    initialValues: {
      failureRecipient: failureRecipient
    },
    validationSchema,
    onSubmit: ({ failureRecipient }) => {
      setFailureRecipient(failureRecipient);
    }
  });

  return (
    <>
      <h2>Failure recipient</h2>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="failureRecipient"
          name="failureRecipient"
          label="failureRecipient"
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
      </form>
    </>
  );
};

export default FailureRecipientForm;


