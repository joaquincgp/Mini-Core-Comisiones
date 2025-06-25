import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Paper,
} from '@mui/material';
import { AccountBalance } from '@mui/icons-material';

const Layout = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: 'background.default' }}>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <AccountBalance sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sistema de Cálculo de Comisiones
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;