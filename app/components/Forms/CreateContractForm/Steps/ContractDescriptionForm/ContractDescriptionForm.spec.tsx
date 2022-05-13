/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import ContractDescriptionForm from './ContractDescriptionForm';

describe('ContractDescriptionForm', () => {
  const mockContractDescription = '0.001';
  const setContractDescription = jest.fn();
  const handlePreviousStep = jest.fn();
  const handleNextStep = jest.fn();
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        render(
          <ContractDescriptionForm
            amount={mockContractDescription}
            setContractDescription={setContractDescription}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
            values={{ amount: mockContractDescription }}
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
        <ContractDescriptionForm
          amount={mockContractDescription}
          setContractDescription={setContractDescription}
          handlePreviousStep={handlePreviousStep}
          handleNextStep={handleNextStep}
          values={{ amount: mockContractDescription }}
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
