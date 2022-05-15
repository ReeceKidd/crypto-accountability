import { render } from '@testing-library/react';
import FailureRecipientSelector from './FailureRecipientSelector';

describe('FailureRecipientSelector', () => {
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() => render(<FailureRecipientSelector />)).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(<FailureRecipientSelector />);

      expect(() => unmount()).not.toThrow();
    });
  });
});
