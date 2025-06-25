// front-react/src/pages/Usuarios.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Alert,
  Grid,
  Card,
  CardContent,
  Divider,
  Chip,
} from '@mui/material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { usuariosAPI, ventasAPI } from '../services/api';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [usuariosRes, ventasRes] = await Promise.all([
        usuariosAPI.obtenerTodos(),
        ventasAPI.obtenerTodas()
      ]);

      setUsuarios(usuariosRes.data);
      setVentas(ventasRes.data);
    } catch (error) {
      setError('Error al cargar los datos');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(valor || 0);
  };

  const formatearFecha = (fecha) => {
    return format(new Date(fecha), 'dd/MM/yyyy', { locale: es });
  };

  const obtenerPorcentajeComision = (totalVentas) => {
    if (totalVentas >= 1000) return 0.15;
    if (totalVentas >= 800) return 0.10;
    if (totalVentas >= 600) return 0.08;
    if (totalVentas >= 500) return 0.06;
    return 0.0;
  };

  if (loading) return <Typography>Cargando...</Typography>;

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" component="h1" gutterBottom color="primary">
        Vendedores - Ventas por Fecha
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Detalle de ventas por vendedor para verificación de cálculos de comisiones
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {usuarios.map((usuario) => {
        const ventasDelVendedor = ventas
          .filter(venta => venta.vendedor_id === usuario.id)
          .sort((a, b) => new Date(a.fecha) - new Date(b.fecha)); // Ordenar por fecha ascendente

        const totalVentas = ventasDelVendedor.reduce((sum, venta) => sum + venta.monto, 0);
        const porcentajeComision = obtenerPorcentajeComision(totalVentas);
        const totalComision = totalVentas * porcentajeComision;

        return (
          <Paper key={usuario.id} elevation={3} sx={{ mb: 4, p: 3 }}>
            {/* Header del vendedor */}
            <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <Grid item xs={12} md={3}>
                <Typography variant="h6" color="primary">
                  {usuario.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {ventasDelVendedor.length} venta{ventasDelVendedor.length !== 1 ? 's' : ''}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card variant="outlined" sx={{ textAlign: 'center', p: 1, backgroundColor: 'success.light', color: 'white' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Total Vendido
                  </Typography>
                  <Typography variant="h6">
                    {formatearMoneda(totalVentas)}
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card variant="outlined" sx={{ textAlign: 'center', p: 1, backgroundColor: 'primary.light', color: 'white' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    % Comisión
                  </Typography>
                  <Typography variant="h6">
                    {(porcentajeComision * 100).toFixed(1)}%
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card variant="outlined" sx={{ textAlign: 'center', p: 1, backgroundColor: 'secondary.light', color: 'white' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Comisión Total
                  </Typography>
                  <Typography variant="h6">
                    {formatearMoneda(totalComision)}
                  </Typography>
                </Card>
              </Grid>
            </Grid>

            <Divider sx={{ mb: 2 }} />

            {/* Tabla de ventas */}
            {ventasDelVendedor.length === 0 ? (
              <Alert severity="info">
                Este vendedor no tiene ventas registradas.
              </Alert>
            ) : (
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'grey.100' }}>
                      <TableCell><strong>Fecha</strong></TableCell>
                      <TableCell align="right"><strong>Monto</strong></TableCell>
                      <TableCell align="right"><strong>Acumulado</strong></TableCell>
                      <TableCell align="center"><strong>Estado</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(() => {
                      let acumulado = 0;
                      return ventasDelVendedor.map((venta, index) => {
                        acumulado += venta.monto;
                        return (
                          <TableRow
                            key={venta.id}
                            sx={{
                              backgroundColor: index % 2 === 0 ? 'grey.50' : 'white',
                              '&:hover': { backgroundColor: 'primary.light', opacity: 0.1 }
                            }}
                          >
                            <TableCell>
                              <Typography variant="body2" fontWeight="medium">
                                {formatearFecha(venta.fecha)}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" fontWeight="bold" color="success.main">
                                {formatearMoneda(venta.monto)}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" fontWeight="medium" color="primary.main">
                                {formatearMoneda(acumulado)}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                label={venta.monto >= 500 ? "Alta" : venta.monto >= 300 ? "Media" : "Baja"}
                                color={venta.monto >= 500 ? "success" : venta.monto >= 300 ? "warning" : "default"}
                                size="small"
                                variant="outlined"
                              />
                            </TableCell>
                          </TableRow>
                        );
                      });
                    })()}
                    {/* Fila de totales */}
                    <TableRow sx={{ backgroundColor: 'primary.main' }}>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                        TOTAL
                      </TableCell>
                      <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>
                        {formatearMoneda(totalVentas)}
                      </TableCell>
                      <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>
                        {formatearMoneda(totalVentas)}
                      </TableCell>
                      <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>
                        {(porcentajeComision * 100).toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {/* Explicación del cálculo */}
            <Box sx={{ mt: 2, p: 2, backgroundColor: 'info.light', borderRadius: 1, color: 'white' }}>
              <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 1 }}>
                🧮 Cálculo de Comisión:
              </Typography>
              <Typography variant="body2">
                Total Vendido: {formatearMoneda(totalVentas)} × {(porcentajeComision * 100).toFixed(1)}% = {formatearMoneda(totalComision)}
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, opacity: 0.9 }}>
                Reglas: ≥$1000→15% | ≥$800→10% | ≥$600→8% | ≥$500→6% | &lt;$500→0%
              </Typography>
            </Box>
          </Paper>
        );
      })}

      {/* Resumen general */}
      <Paper elevation={3} sx={{ p: 3, backgroundColor: 'grey.100' }}>
        <Typography variant="h6" gutterBottom color="primary">
          📊 Resumen General
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="text.secondary">Total Vendedores</Typography>
            <Typography variant="h6" color="primary">{usuarios.length}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="text.secondary">Total Ventas</Typography>
            <Typography variant="h6" color="primary">{ventas.length}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="text.secondary">Monto Total Sistema</Typography>
            <Typography variant="h6" color="success.main">
              {formatearMoneda(ventas.reduce((sum, venta) => sum + venta.monto, 0))}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="body2" color="text.secondary">Comisiones Totales</Typography>
            <Typography variant="h6" color="secondary.main">
              {formatearMoneda(
                usuarios.reduce((totalComisiones, usuario) => {
                  const ventasDelVendedor = ventas.filter(v => v.vendedor_id === usuario.id);
                  const totalVentas = ventasDelVendedor.reduce((sum, v) => sum + v.monto, 0);
                  const porcentaje = obtenerPorcentajeComision(totalVentas);
                  return totalComisiones + (totalVentas * porcentaje);
                }, 0)
              )}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Usuarios;