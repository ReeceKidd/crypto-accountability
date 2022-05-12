import { render } from '@testing-library/react';
import Web3ReactManager from './Web3ReactManager';

describe('Web3ReactManager', () => {
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() => render(<Web3ReactManager />)).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(<Web3ReactManager />);

      expect(() => unmount()).not.toThrow();
    });
  });
});
