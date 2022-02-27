import { FC, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";

interface Web3ReactManagerProps {}

const Web3ReactManager: FC<Web3ReactManagerProps> = ({ children }) => {
  const { activate } = useWeb3React<Web3Provider>();
  useEffect(() => {
    const injectedConnector = new InjectedConnector({
      supportedChainIds: [1, 3, 4, 5, 42],
    });
    activate(injectedConnector);
  }, [activate]);
  return <>{children}</>;
};

export default Web3ReactManager;
