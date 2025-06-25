// front-react/src/App.js
import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Home,
  People,
  Receipt,
  Calculate,
} from '@mui/icons-material';

// Importar las páginas
import HomePage from './pages/Home';
import UsuariosPage from './pages/Usuarios';
import VentasPage from './pages/Ventas';

// Tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff5983',
      dark: '#9a0036',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    success: {
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '2.125rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          borderRadius: 12,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function App() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const tabs = [
    { label: 'Inicio', icon: <Home />, component: <HomePage /> },
    { label: 'Vendedores', icon: <People />, component: <UsuariosPage /> },
    { label: 'Ventas', icon: <Receipt />, component: <VentasPage /> },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
        <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: 'background.default' }}>
          {/* Header con navegación */}
          <AppBar position="static" elevation={2}>
            <Toolbar>
              <Calculate sx={{ mr: 2 }} />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Sistema de Cálculo de Comisiones
              </Typography>
            </Toolbar>
            
            {/* Tabs de navegación */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <Tabs 
                value={currentTab} 
                onChange={handleTabChange}
                textColor="inherit"
                indicatorColor="secondary"
                sx={{ 
                  '& .MuiTab-root': { 
                    color: 'rgba(255,255,255,0.7)',
                    '&.Mui-selected': {
                      color: 'white',
                    }
                  }
                }}
              >
                {tabs.map((tab, index) => (
                  <Tab
                    key={index}
                    icon={tab.icon}
                    label={tab.label}
                    iconPosition="start"
                    sx={{ minHeight: 60 }}
                  />
                ))}
              </Tabs>
            </Box>
          </AppBar>

          {/* Contenido de las páginas */}
          <Container maxWidth="xl">
            {tabs.map((tab, index) => (
              <TabPanel key={index} value={currentTab} index={index}>
                {tab.component}
              </TabPanel>
            ))}
          </Container>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;