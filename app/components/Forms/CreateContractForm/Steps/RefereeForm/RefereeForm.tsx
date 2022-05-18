import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { LoadingButton } from '@mui/lab';
import { ChevronRight } from '@mui/icons-material';

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
  web3Account,
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
        <Box mb={2}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {`Wallet address of referee. A referee can approve or reject your
            contract. If you don't want a referee use your own address.`}
          </Typography>
        </Box>
        <TextField
          fullWidth
          id="referee"
          name="referee"
          value={formik.values.referee}
          onChange={formik.handleChange}
          error={formik.touched.referee && Boolean(formik.errors.referee)}
          helperText={formik.touched.referee && formik.errors.referee}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  type="submit"
                  variant="contained"
                  onClick={() => {
                    formik.setFieldValue('referee', web3Account);
                  }}
                >
                  Use my address
                </Button>
              </InputAdornment>
            )
          }}
        />
        <Box mt={2}>
          <LoadingButton variant="contained" type="submit">
            <ChevronRight />
          </LoadingButton>
        </Box>
      </form>
    </>
  );
};

export default RefereeForm;
