/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import ContractNameForm from './ContractNameForm';

describe('ContractNameForm', () => {
  const mockName = 'Drink water';
  const setName = jest.fn();
  const handlePreviousStep = jest.fn();
  const handleNextStep = jest.fn();
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        render(
          <ContractNameForm
            name={mockName}
            setName={setName}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        )
      ).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(
        <ContractNameForm
          name={mockName}
          setName={setName}
          handlePreviousStep={handlePreviousStep}
          handleNextStep={handleNextStep}
        />
      );

      expect(() => unmount()).not.toThrow();
    });
  });
});
