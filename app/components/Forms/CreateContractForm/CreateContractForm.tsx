import { LinearProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Router from 'next/router';
import { FC, useEffect, useState } from 'react';
import factory from '../../../factory';
import web3 from '../../../web3';
import AmountForm from './Steps/AmountForm/AmountForm';
import ContractDescriptionForm from './Steps/ContractDescriptionForm/ContractDescriptionForm';
import ContractNameForm from './Steps/ContractNameForm/ContractNameForm';
import FailureRecipientForm from './Steps/FailureRecipientForm/FailureRecipientForm';
import RefereeForm from './Steps/RefereeForm/RefereeForm';

interface CreateContractFormProps {
  web3Account: string;
}

const CreateContractForm: FC<CreateContractFormProps> = ({ web3Account }) => {
  const [referee, setReferee] = useState('');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const handleNextStep = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePreviousStep = () => {
    setActiveStep(activeStep - 1);
  };
  const [onSubmitLoading, setOnSubmitLoading] = useState(false);
  const [networkRequestMessage, setNetworkRequestMessage] = useState('');
  const [networkErrorMessage, setNetworkErrorMessage] = useState('');

  const onSubmit = async ({
    failureRecipient
  }: {
    failureRecipient: string;
  }) => {
    setNetworkErrorMessage('');
    setOnSubmitLoading(true);
    try {
      setNetworkRequestMessage('Waiting on transaction success...');
      await factory.methods
        .createAccountabilityContract(
          referee,
          name,
          description,
          failureRecipient
        )
        .send({
          from: web3Account,
          gas: 3000000,
          value: web3.utils.toWei(amount, 'ether')
        });
      setNetworkRequestMessage('Transaction success');
      Router.push(`/contracts`);
    } catch (err) {
      setNetworkRequestMessage('');
      setNetworkErrorMessage((err as Error).message);
    }
    setOnSubmitLoading(false);
  };
  const steps = [
    <RefereeForm
      key={0}
      web3Account={web3Account}
      referee={referee}
      setReferee={setReferee}
      handleNextStep={handleNextStep}
    />,
    <AmountForm
      key={1}
      amount={amount}
      setAmount={setAmount}
      handlePreviousStep={handlePreviousStep}
      handleNextStep={handleNextStep}
    />,
    <ContractNameForm
      key={2}
      name={name}
      setName={setName}
      handlePreviousStep={handlePreviousStep}
      handleNextStep={handleNextStep}
    />,
    <ContractDescriptionForm
      key={3}
      description={description}
      setDescription={setDescription}
      handlePreviousStep={handlePreviousStep}
      handleNextStep={handleNextStep}
    />,
    <FailureRecipientForm
      cryptoAccountabilityAddress={'0xeF3F4cFb69974b5D9AE3a4D6Da747Ec7d1aD6587'}
      key={4}
      handlePreviousStep={handlePreviousStep}
      onSubmit={onSubmit}
      onSubmitLoading={onSubmitLoading}
    />
  ];
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    setPercent(activeStep === 0 ? 0 : (activeStep / steps.length) * 100);
  }, [activeStep, steps.length]);

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" value={percent} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            percent
          )}%`}</Typography>
        </Box>
      </Box>
      {steps[activeStep]}
      {networkRequestMessage && <p>{networkRequestMessage}</p>}
      {networkErrorMessage && <p>{networkErrorMessage}</p>}
    </>
  );
};

export default CreateContractForm;
