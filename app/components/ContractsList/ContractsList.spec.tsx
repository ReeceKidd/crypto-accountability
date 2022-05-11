import { render } from '@testing-library/react';
import ContractsList, { ContractListItem } from './ContractsList';

describe('ContractsList', () => {
  const mockContracts: ContractListItem[] = [
    {
      address: '1234',
      title: 'Drink water'
    }
  ];
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        render(<ContractsList contracts={mockContracts} />)
      ).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(<ContractsList contracts={mockContracts} />);

      expect(() => unmount()).not.toThrow();
    });
  });
});
