import { render } from '@testing-library/react';
import StatisticCards from './StatisticCards';

describe('StatisticCards', () => {
  const mockNumberOfUsers = 1;
  const mockNumberOfAccountabilityContracts = 3;
  const mockTotalEthInContracts = '1.00';
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        render(
          <StatisticCards
            numberOfUsers={mockNumberOfUsers}
            numberOfAccountabilityContracts={
              mockNumberOfAccountabilityContracts
            }
            totalEthInContracts={mockTotalEthInContracts}
          />
        )
      ).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(
        <StatisticCards
          numberOfUsers={mockNumberOfUsers}
          numberOfAccountabilityContracts={mockNumberOfAccountabilityContracts}
          totalEthInContracts={mockTotalEthInContracts}
        />
      );

      expect(() => unmount()).not.toThrow();
    });
  });
});
