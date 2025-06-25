import React from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  Alert,
} from '@mui/material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const TablaComisiones = ({ resumenComisiones }) => {
  if (!resumenComisiones || !resumenComisiones.comisiones.length) {
    return (
      <Alert severity="info" sx={{ mb: 3 }}>
        No hay datos para mostrar. Selecciona un rango de fechas y calcula las comisiones.
      </Alert>
    );
  }

  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(valor);
  };

  const formatearPorcentaje = (valor) => {
    return `${(valor * 100).toFixed(1)}%`;
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom color="primary">
        Comisiones Calculadas
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Período: {resumenComisiones.periodo}
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Vendedor</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Total Ventas</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>% Comisión</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Total Comisión</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resumenComisiones.comisiones.map((comision, index) => (
              <TableRow
                key={comision.vendedor_id}
                hover
                sx={{ backgroundColor: index % 2 === 0 ? 'grey.50' : 'white' }}
              >
                <TableCell>
                  <Typography variant="body1" fontWeight="medium">
                    {comision.vendedor_nombre}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1" fontWeight="medium">
                    {formatearMoneda(comision.total_ventas)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={formatearPorcentaje(comision.porcentaje_comision)}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body1" fontWeight="bold" color="success.main">
                    {formatearMoneda(comision.total_comision)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ mt: 3, p: 2, backgroundColor: 'success.light', borderRadius: 2, color: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="bold">
            Total del Período:
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {formatearMoneda(resumenComisiones.total_comisiones)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
          <Typography variant="body2">
            Total en Ventas:
          </Typography>
          <Typography variant="body1" fontWeight="medium">
            {formatearMoneda(resumenComisiones.total_ventas)}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default TablaComisiones;