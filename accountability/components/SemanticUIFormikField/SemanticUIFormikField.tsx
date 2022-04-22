import React from 'react';
import { Form, Input } from 'semantic-ui-react';

export const SemanticFormikInputField = (props: {
  field: { name: string };
  form: {
    setFieldValue: (name: string, value: string) => void;
    errors: { amount: string };
  };
  label: string;
}) => {
  const {
    field: { name },
    form: {
      setFieldValue,
      errors: { amount }
    },
    label
  } = props;
  console.log('Props', props);

  return (
    <Form.Field>
      <label>{label}</label>
      <Input
        type="text"
        onChange={(event) => {
          setFieldValue(name, event.target.value);
        }}
      />
    </Form.Field>
  );
};
