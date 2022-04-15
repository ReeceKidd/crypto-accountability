import Router from 'next/router';
import { FC, FormEvent, useState } from 'react';
import { Button, Input, Message, TextArea } from 'semantic-ui-react';
import factory from '../../../factory';
import web3 from '../../../web3';
import { Formik, Form, Field } from 'formik';

interface CreateContractFormProps {
  web3Account: string;
  referee: string | null | undefined;
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

interface CreateContractFormValues {
  referee: string;
  amount: string;
  name: string;
  description: string;
  failureRecipient: string;
}

const initialValues: CreateContractFormValues = {
  referee: '',
  amount: '',
  name: '',
  description: '',
  failureRecipient: ''
};

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
  const steps = [
    'Referee',
    'Amount',
    'Name',
    'Description',
    'Failure recipient'
  ];
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;
  const [submitRequestLoading, setSubmitRequestLoading] = useState(false);
  const [networkRequestMessage, setNetworkRequestMessage] = useState('');
  const [networkErrorMessage, setNetworkErrorMessage] = useState('');

  const onSubmit = async () => {
    setNetworkErrorMessage('');
    setSubmitRequestLoading(true);
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
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
          await onSubmit();
        }}
      >
        <Form>
          <Field>
            <label>
              Referee:
              <Input
                label={
                  <Button
                    primary
                    content="Use my address"
                    onClick={(event) => {
                      event.preventDefault();
                      setReferee(web3Account);
                    }}
                  />
                }
                labelPosition="right"
                value={referee}
                onChange={(event) => setReferee(event.target.value)}
              />
            </label>
          </Field>
          <Field>
            <label>
              Amount:
              <Input
                label="eth"
                labelPosition="right"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
            </label>
          </Field>
          <Field>
            <label>
              Contract name:
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
          </Field>
          <Field>
            <label>
              Contract description:
              <TextArea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </label>
          </Field>
          <Field>
            <label>
              Failure recipient:
              <Input
                value={failureRecipient}
                onChange={(event) => setFailureRecipient(event.target.value)}
              />
            </label>
          </Field>
          <Button primary loading={submitRequestLoading} type="submit">
            Enter
          </Button>
        </Form>
      </Formik>

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
