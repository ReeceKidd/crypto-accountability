/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import FailureRecipientForm from './FailureRecipientForm';

describe('FailureRecipientForm', () => {
  const mockFailureRecipient = '0.001';
  const setFailureRecipient = jest.fn();
  const handlePreviousStep = jest.fn();
  const handleNextStep = jest.fn();
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        render(
          <FailureRecipientForm
            amount={mockFailureRecipient}
            setFailureRecipient={setFailureRecipient}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
            values={{ amount: mockFailureRecipient }}
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
        <FailureRecipientForm
          amount={mockFailureRecipient}
          setFailureRecipient={setFailureRecipient}
          handlePreviousStep={handlePreviousStep}
          handleNextStep={handleNextStep}
          values={{ amount: mockFailureRecipient }}
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
