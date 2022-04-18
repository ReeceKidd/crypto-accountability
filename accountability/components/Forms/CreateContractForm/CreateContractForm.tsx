import Router from 'next/router';
import { FC, FormEvent, useState } from 'react';
import { Message, Form } from 'semantic-ui-react';
import factory from '../../../factory';
import web3 from '../../../web3';
import AmountForm from '../AmountForm/AmountForm';
import ContractDescriptionForm from '../ContractDescriptionForm/ContractDescriptionForm';
import ContractNameForm from '../ContractNameForm/ContractNameForm';
import FailureRecipientForm from '../FailureRecipientForm/FailureRecipientForm';
import RefereeForm from '../RefereeForm/RefereeForm';

interface CreateContractFormProps {
  web3Account: string;
  referee: string;
  setReferee: (input: string) => void;
  amount: string;
  setAmount: (input: string) => void;
  name: string;
  setName: (input: string) => void;
  description: string;
  setDescription: (input: string) => void;
  failureRecipient: string;
  setFailureRecipient: (input: string) => void;
}

const CreateContractForm: FC<CreateContractFormProps> = ({
  web3Account,
  referee,
  setReferee,
  amount,
  setAmount,
  name,
  setName,
  description,
  setDescription,
  failureRecipient,
  setFailureRecipient
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const handleNextStep = () => {
    setActiveStep(activeStep + 1);
  };
  const handlePreviousStep = () => {
    setActiveStep(activeStep - 1);
  };
  const [submitRequestLoading, setSubmitRequestLoading] = useState(false);
  const steps = [
    <RefereeForm
      key={0}
      web3Account={web3Account}
      referee={referee}
      setReferee={setReferee}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
    />,
    <AmountForm
      key={1}
      amount={amount}
      setAmount={setAmount}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
    />,
    <ContractNameForm
      key={2}
      name={name}
      setName={setName}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
    />,
    <ContractDescriptionForm
      key={3}
      description={description}
      setDescription={setDescription}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
    />,
    <FailureRecipientForm
      key={4}
      failureRecipient={failureRecipient}
      setFailureRecipient={setFailureRecipient}
      handlePreviousStep={handlePreviousStep}
      isFinalStep={true}
      submitRequestLoading={submitRequestLoading}
    />
  ];

  const [networkRequestMessage, setNetworkRequestMessage] = useState('');
  const [networkErrorMessage, setNetworkErrorMessage] = useState('');

  const onSubmit = async (event: FormEvent) => {
    setNetworkErrorMessage('');
    setSubmitRequestLoading(true);
    event.preventDefault();
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
    setSubmitRequestLoading(false);
  };
  return (
    <>
      <Form onSubmit={(event) => onSubmit(event)}>{steps[activeStep]}</Form>
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
