import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';

interface RefereeFormProps {
  web3Account: string;
  referee: string;
  setReferee: (referee: string) => void;
  handleNextStep: () => void;
}

const validationSchema = Yup.object({
  referee: Yup.string()
    .required('referee is required')
    .typeError('referee must be a number')
});

const RefereeForm = ({
  referee,
  setReferee,
  handleNextStep
}: RefereeFormProps) => {
  const formik = useFormik({
    initialValues: {
      referee: referee
    },
    validationSchema,
    onSubmit: ({ referee }) => {
      setReferee(referee);
      handleNextStep();
    }
  });

  return (
    <>
      <h2>Referee</h2>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="referee"
          name="referee"
          label="referee"
          value={formik.values.referee}
          onChange={formik.handleChange}
          error={formik.touched.referee && Boolean(formik.errors.referee)}
          helperText={formik.touched.referee && formik.errors.referee}
        />
        <Button type="submit">Next</Button>
      </form>
    </>
  );
};

export default RefereeForm;
