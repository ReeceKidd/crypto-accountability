import { useWeb3React } from '@web3-react/core';
import { FC } from 'react';
import LandingPage from '../LandingPage/LandingPage';

const LandingPageManager: FC = ({ children }) => {
  const { account } = useWeb3React();
  console.log('Account', account);
  return <> {account ? children : <LandingPage />}</>;
};

export default LandingPageManager;
