import { render } from '@testing-library/react';
import { FailureRecipientOptions } from '../Forms/CreateContractForm/CreateContractForm';
import FailureRecipientSelector from './FailureRecipientSelector';

describe('FailureRecipientSelector', () => {
  const mockCryptoAccountabilityAddress =
    '0xeF3F4cFb69974b5D9AE3a4D6Da747Ec7d1aD6587';
  const mockSetFailureRecipient = jest.fn();
  const mockFailureRecipientOption =
    FailureRecipientOptions.cryptoAccountability;
  const mockSetFailureRecipientOption = jest.fn();
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        render(
          <FailureRecipientSelector
            cryptoAccountabilityAddress={mockCryptoAccountabilityAddress}
            setFailureRecipient={mockSetFailureRecipient}
            failureRecipientOption={mockFailureRecipientOption}
            setFailureRecipientOption={mockSetFailureRecipientOption}
          />
        )
      ).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(
        <FailureRecipientSelector
          cryptoAccountabilityAddress={mockCryptoAccountabilityAddress}
          setFailureRecipient={mockSetFailureRecipient}
          failureRecipientOption={mockFailureRecipientOption}
          setFailureRecipientOption={mockSetFailureRecipientOption}
        />
      );

      expect(() => unmount()).not.toThrow();
    });
  });
});
