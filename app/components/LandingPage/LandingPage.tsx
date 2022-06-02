import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Box, Button } from '@mui/material';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

const LandingPage = () => {
  const { activate } = useWeb3React<Web3Provider>();
  const injectedConnector = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42]
  });

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              Cryptcommit
            </Typography>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                flexGrow: 0,
                alignItems: 'flex-end'
              }}
              style={{ marginLeft: 'auto' }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={() => activate(injectedConnector)}
              >
                Use app
              </Button>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              Cryptcommit
            </Typography>
            <Box
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              style={{ marginLeft: 'auto' }}
            >
              <Button
                onClick={() => activate(injectedConnector)}
                color="secondary"
                variant="contained"
              >
                Use app
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default LandingPage;
