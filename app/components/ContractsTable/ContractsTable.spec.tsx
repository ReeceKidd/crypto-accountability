import { render } from '@testing-library/react';
import ContractsTable, { AccountabilityContract } from './ContractsTable';

describe('ContractsTable', () => {
  const mockAccountabilityContracts: AccountabilityContract[] = [
    {
      address: '1234',
      name: 'Drink water',
      status: 'Open',
      amount: '100000',
      creator: '0x63613F346EAcDa7f0600608d988fDca2C9b45088'
    }
  ];
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        render(
          <ContractsTable
            contracts={mockAccountabilityContracts}
            isReferee={true}
          />
        )
      ).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(
        <ContractsTable
          contracts={mockAccountabilityContracts}
          isReferee={true}
        />
      );

      expect(() => unmount()).not.toThrow();
    });
  });
});
