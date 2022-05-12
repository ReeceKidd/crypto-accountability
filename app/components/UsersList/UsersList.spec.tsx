import { render } from '@testing-library/react';
import UsersList from './UsersList';

describe('UsersList', () => {
  const mockUserAddresses = ['1234'];
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        render(<UsersList userAddresses={mockUserAddresses} />)
      ).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(
        <UsersList userAddresses={mockUserAddresses} />
      );

      expect(() => unmount()).not.toThrow();
    });
  });
});
