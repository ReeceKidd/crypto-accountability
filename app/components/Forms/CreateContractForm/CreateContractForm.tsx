import Router from 'next/router';
import { FC, useEffect, useState } from 'react';
import { Message, Progress } from '@mui/material';
import factory from '../../../factory';
import web3 from '../../../web3';
import AmountForm from './Steps/AmountForm/AmountForm';
import ContractDescriptionForm from './Steps/ContractDescriptionForm/ContractDescriptionForm';
import ContractNameForm from './Steps/ContractNameForm/ContractNameForm';
import FailureRecipientForm, {
  FailureRecipientOptions
} from './Steps/FailureRecipientForm/FailureRecipientForm';
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
  const [failureRecipientOption, setFailureRecipientOption] =
    useState<FailureRecipientOptions>(FailureRecipientOptions.friendOrEnemy);

  const onSubmit = async ({
    referee,
    name,
    description,
    failureRecipient
  }: {
    referee: string;
    name: string;
    description: string;
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
      name={name}
      description={description}
      referee={referee}
      failureRecipientOption={failureRecipientOption}
      setFailureRecipientOption={setFailureRecipientOption}
      handlePreviousStep={handlePreviousStep}
      onSubmit={onSubmit}
      onSumbitLoading={onSubmitLoading}
    />
  ];
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    setPercent(activeStep === 0 ? 0 : (activeStep / steps.length) * 100);
  }, [activeStep, steps.length]);

  return (
    <>
      <Progress percent={percent} indicating />
      {steps[activeStep]}
      {networkRequestMessage && (
        <Message
          content={networkRequestMessage}
          success={networkRequestMessage === 'Transaction success'}
        />
      )}
      {networkErrorMessage && (
        <Message negative content={networkErrorMessage} error />
      )}
    </>
  );
};

export default CreateContractForm;
