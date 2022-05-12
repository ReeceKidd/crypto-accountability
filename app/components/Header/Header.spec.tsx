import { render } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() => render(<Header />)).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(<Header />);

      expect(() => unmount()).not.toThrow();
    });
  });
});
