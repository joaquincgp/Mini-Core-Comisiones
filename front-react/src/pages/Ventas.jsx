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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ventasAPI, usuariosAPI } from '../services/api';

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [vendedorFiltro, setVendedorFiltro] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    filtrarVentas();
  }, [vendedorFiltro]);

  const cargarDatos = async () => {
    try {
      const [ventasRes, usuariosRes] = await Promise.all([
        ventasAPI.obtenerTodas(),
        usuariosAPI.obtenerTodos()
      ]);

      setVentas(ventasRes.data);
      setUsuarios(usuariosRes.data);
    } catch (error) {
      setError('Error al cargar los datos');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filtrarVentas = async () => {
    try {
      const params = vendedorFiltro ? { vendedor_id: vendedorFiltro } : {};
      const response = await ventasAPI.obtenerTodas(params);
      setVentas(response.data);
    } catch (error) {
      console.error('Error al filtrar ventas:', error);
    }
  };

  const formatearMoneda = (valor) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(valor);
  };

  const formatearFecha = (fecha) => {
    return format(new Date(fecha), 'dd/MM/yyyy', { locale: es });
  };

  if (loading) return <Typography>Cargando...</Typography>;

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom color="primary">
        Gestión de Ventas
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ mb: 3 }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Filtrar por Vendedor</InputLabel>
            <Select
              value={vendedorFiltro}
              label="Filtrar por Vendedor"
              onChange={(e) => setVendedorFiltro(e.target.value)}
            >
              <MenuItem value="">Todos los vendedores</MenuItem>
              {usuarios.map((usuario) => (
                <MenuItem key={usuario.id} value={usuario.id}>
                  {usuario.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Typography variant="h6" gutterBottom>
          Lista de Ventas ({ventas.length} registros)
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Fecha</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Vendedor</TableCell>
                <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Monto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ventas.map((venta, index) => (
                <TableRow
                  key={venta.id}
                  hover
                  sx={{ backgroundColor: index % 2 === 0 ? 'grey.50' : 'white' }}
                >
                  <TableCell>{venta.id}</TableCell>
                  <TableCell>
                    {formatearFecha(venta.fecha)}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="medium">
                      {venta.vendedor_nombre}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body1" fontWeight="bold" color="success.main">
                      {formatearMoneda(venta.monto)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3, p: 2, backgroundColor: 'primary.light', borderRadius: 2, color: 'white' }}>
          <Typography variant="h6" fontWeight="bold">
            Total: {formatearMoneda(ventas.reduce((sum, venta) => sum + venta.monto, 0))}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Ventas;