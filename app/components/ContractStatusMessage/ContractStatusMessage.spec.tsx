import { render } from '@testing-library/react';
import ContractStatusMessage from './ContractStatusMessage';
import { ContractStatus } from '../../helpers/getAccountabilityContractStatus';

describe('ContractStatusMessage', () => {
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        render(<ContractStatusMessage status={ContractStatus.SUCCESS} />)
      ).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(
        <ContractStatusMessage status={ContractStatus.SUCCESS} />
      );

      expect(() => unmount()).not.toThrow();
    });
  });
});
