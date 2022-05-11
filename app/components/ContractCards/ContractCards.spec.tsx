import { render } from '@testing-library/react';
import ContractCards from './ContractCards';

describe('ContractCards', () => {
  const mockCreator = '1234';
  const mockReferee = 'abcd';
  const mockFailureRecipient = '1a2b';
  const mockAmount = '0.001';
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        render(
          <ContractCards
            creator={mockCreator}
            referee={mockReferee}
            failureRecipient={mockFailureRecipient}
            amount={mockAmount}
          />
        )
      ).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(
        <ContractCards
          creator={mockCreator}
          referee={mockReferee}
          failureRecipient={mockFailureRecipient}
          amount={mockAmount}
        />
      );

      expect(() => unmount()).not.toThrow();
    });
  });
});
