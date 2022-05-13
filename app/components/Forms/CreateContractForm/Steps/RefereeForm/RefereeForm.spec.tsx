/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import RefereeForm from './RefereeForm';

describe('RefereeForm', () => {
  const mockReferee = '0.001';
  const setReferee = jest.fn();
  const handlePreviousStep = jest.fn();
  const handleNextStep = jest.fn();
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        render(
          <RefereeForm
            amount={mockReferee}
            setReferee={setReferee}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
            values={{ amount: mockReferee }}
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
        <RefereeForm
          amount={mockReferee}
          setReferee={setReferee}
          handlePreviousStep={handlePreviousStep}
          handleNextStep={handleNextStep}
          values={{ amount: mockReferee }}
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
