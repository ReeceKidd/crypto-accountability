import { Button, Icon } from 'semantic-ui-react';

interface FormNavigationButtonsProps {
  handlePreviousStep: () => void;
  onSubmitLoading?: boolean;
}

const FormNavigationButtons = ({
  handlePreviousStep,
  onSubmitLoading
}: FormNavigationButtonsProps) => {
  return (
    <div style={{ flexDirection: 'row' }}>
      <Button
        color="blue"
        onClick={() => handlePreviousStep()}
        style={{ width: '10%' }}
      >
        <Icon name="chevron left" />
      </Button>
      <Button
        loading={onSubmitLoading}
        type="submit"
        color="blue"
        style={{ width: '10%' }}
      >
        <Icon name="chevron right" />
      </Button>
    </div>
  );
};

export default FormNavigationButtons;
