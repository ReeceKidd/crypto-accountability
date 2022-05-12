import { render } from '@testing-library/react';
import FormStep from './FormStep';

describe('FormStep', () => {
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() => render(<FormStep isFinalStep={false} />)).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(<FormStep isFinalStep={false} />);

      expect(() => unmount()).not.toThrow();
    });
  });
});
