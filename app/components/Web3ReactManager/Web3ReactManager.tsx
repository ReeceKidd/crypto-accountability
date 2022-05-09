import { FC, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { InjectedConnector } from '@web3-react/injected-connector';

const Web3ReactManager: FC = ({ children }) => {
  const { activate } = useWeb3React<Web3Provider>();

  useEffect(() => {
    const injectedConnector = new InjectedConnector({
      supportedChainIds: [1, 3, 4, 5, 42]
    });
    setTimeout(() => activate(injectedConnector), 500);
  }, [activate]);
  return <>{children}</>;
};

export default Web3ReactManager;
