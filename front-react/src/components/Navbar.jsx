import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import {
  Home,
  People,
  Receipt,
  Calculate,
} from '@mui/icons-material';

const Navbar = ({ currentPage, onPageChange }) => {
  const menuItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'usuarios', label: 'Vendedores', icon: People },
    { id: 'ventas', label: 'Ventas', icon: Receipt },
    { id: 'comisiones', label: 'Comisiones', icon: Calculate },
  ];

  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sistema de Comisiones
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                color="inherit"
                startIcon={<Icon />}
                onClick={() => onPageChange(item.id)}
                sx={{
                  backgroundColor: currentPage === item.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;