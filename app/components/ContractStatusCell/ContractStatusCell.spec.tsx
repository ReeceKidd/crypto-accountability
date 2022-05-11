import { render } from '@testing-library/react';
import ContractStatusCell from './ContractStatusCell';
import { ContractStatus } from '../../helpers/getAccountabilityContractStatus';

describe('ContractStatusCell', () => {
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        render(<ContractStatusCell status={ContractStatus.SUCCESS} />)
      ).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(
        <ContractStatusCell status={ContractStatus.SUCCESS} />
      );

      expect(() => unmount()).not.toThrow();
    });
  });
});
