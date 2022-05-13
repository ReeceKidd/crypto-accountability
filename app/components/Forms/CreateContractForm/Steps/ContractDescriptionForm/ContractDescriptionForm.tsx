import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';

interface AmountFormProps {
  description: string;
  setAmount: (description: string) => void;
  handlePreviousStep: () => void;
  handleNextStep: () => void;
}

const validationSchema = Yup.object({
  description: Yup.string()
    .required('description is required')
    .typeError('description must be a number')
});

const ContractDescriptionForm = ({
  description,
  setAmount
}: AmountFormProps) => {
  const formik = useFormik({
    initialValues: {
      description: description
    },
    validationSchema,
    onSubmit: ({ description }) => {
      setAmount(description);
    }
  });

  return (
    <>
      <h2> Description</h2>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="description"
          name="description"
          label="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
      </form>
    </>
  );
};

export default ContractDescriptionForm;


