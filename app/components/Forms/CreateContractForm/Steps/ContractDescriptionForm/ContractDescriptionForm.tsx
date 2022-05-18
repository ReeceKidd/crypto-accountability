import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import FormNavigationButtons from '../../../../FormNavigationButtons/FormNavigationButtons';

interface FormProps {
  description: string;
  setDescription: (description: string) => void;
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
  setDescription,
  handlePreviousStep,
  handleNextStep
}: FormProps) => {
  const formik = useFormik({
    initialValues: {
      description: description
    },
    validationSchema,
    onSubmit: ({ description }) => {
      setDescription(description);
      handleNextStep();
    }
  });

  return (
    <>
      <h2> Description</h2>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          multiline
          rows={3}
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <FormNavigationButtons handlePreviousStep={handlePreviousStep} />
      </form>
    </>
  );
};

export default ContractDescriptionForm;
