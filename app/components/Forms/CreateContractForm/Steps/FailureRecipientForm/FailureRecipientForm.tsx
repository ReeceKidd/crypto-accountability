import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import FailureRecipientSelector from '../../../../FailureRecipientSelector/FailureRecipientSelector';
import FormNavigationButtons from '../../../../FormNavigationButtons/FormNavigationButtons';
import { FailureRecipientOptions } from '../../CreateContractForm';

interface FailureRecipientFormProps {
  failureRecipientOption: FailureRecipientOptions;
  setFailureRecipientOption: (option: FailureRecipientOptions) => void;
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
  cryptoAccountabilityAddress,
  failureRecipientOption,
  setFailureRecipientOption,
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
      <FailureRecipientSelector
        cryptoAccountabilityAddress={cryptoAccountabilityAddress}
        setFailureRecipient={(failureRecipient: string) =>
          formik.setFieldValue('failureRecipient', failureRecipient)
        }
        failureRecipientOption={failureRecipientOption}
        setFailureRecipientOption={setFailureRecipientOption}
      />
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          disabled={
            failureRecipientOption ===
            FailureRecipientOptions.cryptoAccountability
          }
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
