export enum ContractStatus {
  OPEN = 'Open',
  AWAITING_APPROVAL = 'Awaiting approval',
  SUCCESS = 'Success',
  FAILURE = 'Failure'
}

export const getAccountabilityContractStatus = (status: string): string => {
  const statusDictionary: { [key: string]: string } = {
    '0': ContractStatus.OPEN,
    '1': ContractStatus.AWAITING_APPROVAL,
    '2': ContractStatus.SUCCESS,
    '3': ContractStatus.FAILURE
  };
  return statusDictionary[status];
};
