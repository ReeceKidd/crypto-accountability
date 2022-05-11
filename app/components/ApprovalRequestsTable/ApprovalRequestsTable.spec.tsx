import { render } from '@testing-library/react';
import ApprovalRequestsTable, {
  ApprovalRequest
} from './ApprovalRequestsTable';

describe('ApprovalRequestsTable', () => {
  const mockApprovalRequests: ApprovalRequest[] = [
    {
      accountabilityContractAddress: '1234',
      accountabilityContractName: 'Drink water',
      address: 'abc',
      creator: 'abc'
    }
  ];
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        render(
          <ApprovalRequestsTable approvalRequests={mockApprovalRequests} />
        )
      ).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(
        <ApprovalRequestsTable approvalRequests={mockApprovalRequests} />
      );

      expect(() => unmount()).not.toThrow();
    });
  });
});
