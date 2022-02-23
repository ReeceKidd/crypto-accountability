import Router from "next/router";
import { FC, FormEvent, useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import factory from "../../factory";

interface CreateContractFormProps {
  web3Account: string;
  name: string;
  setName: (input: string) => void;
  description: string;
  setDescription: (input: string) => void;
  failureRecipient: string;
  setFailureRecipient: (input: string) => void;
}

const CreateContractForm: FC<CreateContractFormProps> = ({
  web3Account,
  name,
  setName,
  description,
  setDescription,
  failureRecipient,
  setFailureRecipient,
}) => {
  const [submitRequestLoading, setSubmitRequestLoading] = useState(false);
  const [networkRequestMessage, setNetworkRequestMessage] = useState("");
  const [networkErrorMessage, setNetworkErrorMessage] = useState("");

  const onSubmit = async (event: FormEvent) => {
    setNetworkErrorMessage("");
    setSubmitRequestLoading(true);
    event.preventDefault();
    try {
      setNetworkRequestMessage("Waiting on transaction success...");
      await factory.methods
        .createAccountabilityContract(name, description, failureRecipient)
        .send({
          from: web3Account,
          gas: 1000000,
        });
      setNetworkRequestMessage("Transaction success");
      Router.push(`/contracts`);
    } catch (err) {
      setNetworkRequestMessage("");
      setNetworkErrorMessage((err as Error).message);
    }
    setSubmitRequestLoading(false);
  };
  return (
    <>
      <Form onSubmit={(event) => onSubmit(event)}>
        <Form.Field>
          <label>
            Contract name:
            <input
              type="text"
              name={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label>
            Contract description:
            <input
              type="text"
              name={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
        </Form.Field>
        <Form.Field>
          <label>
            Failure recipient:
            <input
              type="text"
              name={failureRecipient}
              onChange={(event) => setFailureRecipient(event.target.value)}
            />
          </label>
        </Form.Field>
        <Button loading={submitRequestLoading} type="submit">
          Enter
        </Button>
      </Form>
      {networkRequestMessage && (
        <Message
          content={networkRequestMessage}
          success={networkRequestMessage === "Transaction success"}
        />
      )}
      {networkErrorMessage && (
        <Message negative content={networkErrorMessage} error />
      )}
    </>
  );
};

export default CreateContractForm;
