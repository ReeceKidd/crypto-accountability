import { render } from '@testing-library/react';
import ContractsTable, { AccountabilityContract } from './ContractsTable';

describe('ContractsTable', () => {
  const mockAccountabilityContracts: AccountabilityContract[] = [
    {
      address: '1234',
      name: 'Drink water',
      status: 'Open',
      amount: '1.00'
    }
  ];
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        render(<ContractsTable contracts={mockAccountabilityContracts} />)
      ).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(
        <ContractsTable contracts={mockAccountabilityContracts} />
      );

      expect(() => unmount()).not.toThrow();
    });
  });
});
