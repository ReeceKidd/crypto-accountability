/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import AmountForm from './AmountForm';

describe('AmountForm', () => {
  const mockAmount = '0.001';
  const setAmount = jest.fn();
  const handlePreviousStep = jest.fn();
  const handleNextStep = jest.fn();
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        render(
          <AmountForm
            amount={mockAmount}
            setAmount={setAmount}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        )
      ).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(
        <AmountForm
          amount={mockAmount}
          setAmount={setAmount}
          handlePreviousStep={handlePreviousStep}
          handleNextStep={handleNextStep}
        />
      );

      expect(() => unmount()).not.toThrow();
    });
  });
});
