import { render } from '@testing-library/react';
import FailureRecipientSelector, {
  FailureRecipientOption
} from './FailureRecipientSelector';
import { FailureRecipientOptions } from '../Forms/CreateContractForm/Steps/FailureRecipientForm/FailureRecipientForm';

describe('FailureRecipientSelector', () => {
  const mockFailureRecipientOption =
    FailureRecipientOptions.cryptoAccountability;
  const mockFailureRecipients: { [key: string]: FailureRecipientOption } = {
    cryptoAccountability: {
      title: 'Crypto accountability',
      description: 'Support the app'
    }
  };
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        render(
          <FailureRecipientSelector
            failureRecipientOption={mockFailureRecipientOption}
            failureRecipients={mockFailureRecipients}
          />
        )
      ).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(
        <FailureRecipientSelector
          failureRecipientOption={mockFailureRecipientOption}
          failureRecipients={mockFailureRecipients}
        />
      );

      expect(() => unmount()).not.toThrow();
    });
  });
});
