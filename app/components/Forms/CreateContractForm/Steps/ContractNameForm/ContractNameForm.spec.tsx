/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import ContractNameForm from './ContractNameForm';

describe('ContractNameForm', () => {
  const mockContractName = '0.001';
  const setContractName = jest.fn();
  const handlePreviousStep = jest.fn();
  const handleNextStep = jest.fn();
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        render(
          <ContractNameForm
            amount={mockContractName}
            setContractName={setContractName}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
            values={{ amount: mockContractName }}
            errors={{ amount: 'invalid' }}
            touched={{ amount: true }}
            isSubmitting={false}
            isValidating={false}
            handleReset={jest.fn()}
            submitCount={0}
            {...([] as any)}
          />
        )
      ).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(
        <ContractNameForm
          amount={mockContractName}
          setContractName={setContractName}
          handlePreviousStep={handlePreviousStep}
          handleNextStep={handleNextStep}
          values={{ amount: mockContractName }}
          errors={{ amount: 'invalid' }}
          touched={{ amount: true }}
          isSubmitting={false}
          isValidating={false}
          handleReset={jest.fn()}
          {...([] as any)}
        />
      );

      expect(() => unmount()).not.toThrow();
    });
  });
});
