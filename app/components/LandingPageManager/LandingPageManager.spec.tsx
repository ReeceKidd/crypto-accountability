import { render } from '@testing-library/react';
import LandingPageManager from './LandingPageManager';

describe('LandingPageManager', () => {
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() => render(<LandingPageManager />)).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(<LandingPageManager />);

      expect(() => unmount()).not.toThrow();
    });
  });
});
