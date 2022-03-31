export enum ContractStatus {
  OPEN = 'Open',
  SUCCESS = 'Success',
  FAILURE = 'Failure',
  UNKNOWN = 'Unknown'
}

export const getAccountabilityContractStatus = (status: string): string => {
  const statusDictionary: { [key: string]: string } = {
    '0': ContractStatus.OPEN,
    '1': ContractStatus.SUCCESS,
    '2': ContractStatus.FAILURE
  };
  return statusDictionary[status];
};
