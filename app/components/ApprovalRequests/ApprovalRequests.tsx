import { useCallback, useEffect, useState } from 'react';
import { getAccountabilityContract, getApprovalRequest } from '../../factory';
import ApprovalRequestsTable, {
  ApprovalRequest
} from '../ApprovalRequestsTable/ApprovalRequestsTable';

interface ApprovalRequestsProps {
  approvalRequestAddresses: string[];
  setLoading: (loading: boolean) => void;
}

const ApprovalRequests = ({
  approvalRequestAddresses,
  setLoading
}: ApprovalRequestsProps) => {
  const getApprovalRequests = useCallback(
    async (
      completeAccountabilityContractRequestAddresses: string[],
      setCompleteAccountabilityContractRequests: (
        completeAccountabilityContractRequests: ApprovalRequest[]
      ) => void
    ) => {
      setLoading(true);
      const completeAccountabilityContractRequests = await Promise.all(
        completeAccountabilityContractRequestAddresses.map(async (address) => {
          const approvalRequest = getApprovalRequest(address);
          const [creator, status, accountabilityContractAddress] =
            await Promise.all([
              approvalRequest.methods.creator().call(),
              approvalRequest.methods.status().call(),
              approvalRequest.methods.accountabilityContractAddress().call()
            ]);
          const accountabilityContract = getAccountabilityContract(
            accountabilityContractAddress
          );
          const accountabilityContractName =
            await accountabilityContract.methods.name().call();
          return {
            address,
            creator,
            status,
            accountabilityContractAddress,
            accountabilityContractName
          };
        })
      );
      setCompleteAccountabilityContractRequests(
        completeAccountabilityContractRequests
      );
      setLoading(false);
    },
    [setLoading]
  );
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>(
    []
  );
  useEffect(() => {
    getApprovalRequests(approvalRequestAddresses, setApprovalRequests);
  }, [getApprovalRequests, approvalRequestAddresses, setApprovalRequests]);
  return <ApprovalRequestsTable approvalRequests={approvalRequests} />;
};

export default ApprovalRequests;
