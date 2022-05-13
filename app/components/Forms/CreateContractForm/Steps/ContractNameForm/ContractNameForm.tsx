import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';

interface AmountFormProps {
  name: string;
  setAmount: (name: string) => void;
  handlePreviousStep: () => void;
  handleNextStep: () => void;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required('name is required')
    .typeError('name must be a number')
});

const ContractNameForm = ({ name, setAmount }: AmountFormProps) => {
  const formik = useFormik({
    initialValues: {
      name: name
    },
    validationSchema,
    onSubmit: ({ name }) => {
      setAmount(name);
    }
  });

  return (
    <>
      <h2> Name</h2>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
      </form>
    </>
  );
};

export default ContractNameForm;


