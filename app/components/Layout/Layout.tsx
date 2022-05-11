import { FC } from 'react';
import { Container } from '@mui/material';
import Header from '../Header/Header';

const Layout: FC = ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
};

export default Layout;
