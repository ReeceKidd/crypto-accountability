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
            description={mockContractDescription}
            setDescription={setContractDescription}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        )
      ).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(
        <ContractDescriptionForm
          description={mockContractDescription}
          setDescription={setContractDescription}
          handlePreviousStep={handlePreviousStep}
          handleNextStep={handleNextStep}
        />
      );

      expect(() => unmount()).not.toThrow();
    });
  });
});
