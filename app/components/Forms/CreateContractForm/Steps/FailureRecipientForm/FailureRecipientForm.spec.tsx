/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import { FailureRecipientOptions } from '../../CreateContractForm';
import FailureRecipientForm from './FailureRecipientForm';

describe('FailureRecipientForm', () => {
  const mockFailureRecipientOption =
    FailureRecipientOptions.cryptoAccountability;
  const mockSetFailureRecipientOption = jest.fn();
  const mockHandlePreviousStep = jest.fn();
  const mockOnSubmit = jest.fn();
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        render(
          <FailureRecipientForm
            failureRecipientOption={mockFailureRecipientOption}
            setFailureRecipientOption={mockSetFailureRecipientOption}
            cryptoAccountabilityAddress={'1234'}
            handlePreviousStep={mockHandlePreviousStep}
            onSubmit={mockOnSubmit}
            onSubmitLoading={false}
          />
        )
      ).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(
        <FailureRecipientForm
          failureRecipientOption={mockFailureRecipientOption}
          setFailureRecipientOption={mockSetFailureRecipientOption}
          cryptoAccountabilityAddress={'1234'}
          handlePreviousStep={mockHandlePreviousStep}
          onSubmit={mockOnSubmit}
          onSubmitLoading={false}
        />
      );

      expect(() => unmount()).not.toThrow();
    });
  });
});
