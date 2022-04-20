import React from 'react';
import { Form } from 'semantic-ui-react';

export const SemanticFormikInputField = (props: {
  field: { name: string };
  form: { setFieldValue: (name: string, value: string) => void };
  label: string;
}) => {
  const {
    field: { name },
    form: { setFieldValue },
    label
  } = props;

  return (
    <Form.Field>
      <label>{label}</label>
      <input
        type="text"
        onChange={(event) => {
          setFieldValue(name, event.target.value);
        }}
      />
    </Form.Field>
  );
};
