import { render } from '@testing-library/react';
import CreateContractForm from './CreateContractForm';

describe('CreateContractForm', () => {
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        render(<CreateContractForm web3Account="1234" />)
      ).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(<CreateContractForm web3Account="1234" />);

      expect(() => unmount()).not.toThrow();
    });
  });
});
