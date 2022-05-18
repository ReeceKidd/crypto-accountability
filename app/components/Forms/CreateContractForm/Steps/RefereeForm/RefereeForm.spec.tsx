/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import RefereeForm from './RefereeForm';

describe('RefereeForm', () => {
  const mockWeb3Account = '1234';
  const mockReferee = '0.001';
  const setReferee = jest.fn();
  const handleNextStep = jest.fn();
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        render(
          <RefereeForm
            web3Account={mockWeb3Account}
            referee={mockReferee}
            setReferee={setReferee}
            handleNextStep={handleNextStep}
          />
        )
      ).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(
        <RefereeForm
          web3Account={mockWeb3Account}
          referee={mockReferee}
          setReferee={setReferee}
          handleNextStep={handleNextStep}
        />
      );

      expect(() => unmount()).not.toThrow();
    });
  });
});
