export enum ContractStatus {
  OPEN = "Open",
  SUCCESS = "Success",
  FAILURE = "Failure",
}

export const getContractStatus = (status: string): string => {
  const statusDictionary: { [key: string]: string } = {
    "0": ContractStatus.OPEN,
    "1": ContractStatus.SUCCESS,
    "2": ContractStatus.FAILURE,
  };
  return statusDictionary[status] || "Unknown";
};
