import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Grid,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Calculate } from '@mui/icons-material';

const FiltroFechas = ({ onCalcular, loading }) => {
  const [fechaInicio, setFechaInicio] = useState(new Date('2025-05-01'));
  const [fechaFin, setFechaFin] = useState(new Date('2025-06-30'));

  const handleCalcular = () => {
    if (fechaInicio && fechaFin) {
      onCalcular({ fechaInicio, fechaFin });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom color="primary">
        Filtrar por Rango de Fechas
      </Typography>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={4}>
          <DatePicker
            label="Fecha de Inicio"
            value={fechaInicio}
            onChange={setFechaInicio}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: 'outlined',
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DatePicker
            label="Fecha de Fin"
            value={fechaFin}
            onChange={setFechaFin}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: 'outlined',
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            size="large"
            onClick={handleCalcular}
            disabled={loading || !fechaInicio || !fechaFin}
            fullWidth
            startIcon={loading ? <CircularProgress size={20} /> : <Calculate />}
            sx={{ height: 56 }}
          >
            {loading ? 'Calculando...' : 'Calcular Comisiones'}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FiltroFechas;