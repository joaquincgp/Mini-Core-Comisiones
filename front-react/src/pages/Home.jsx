import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Alert,
  Box,
} from '@mui/material';
import { format } from 'date-fns';
import FiltroFechas from '../components/FiltroFechas';
import TablaComisiones from '../components/TablaComisiones';
import TarjetasInformativas from '../components/TarjetasInformativas';
import { usuariosAPI, ventasAPI, comisionesAPI } from '../services/api';

const Home = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [reglasComision, setReglasComision] = useState([]);
  const [resumenComisiones, setResumenComisiones] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cargar datos iniciales
  useEffect(() => {
    cargarDatosIniciales();
  }, []);

  const cargarDatosIniciales = async () => {
    try {
      const [usuariosRes, ventasRes, reglasRes] = await Promise.all([
        usuariosAPI.obtenerTodos(),
        ventasAPI.obtenerTodas(),
        comisionesAPI.obtenerReglas()
      ]);

      setUsuarios(usuariosRes.data);
      setVentas(ventasRes.data);
      setReglasComision(reglasRes.data);
    } catch (error) {
      setError('Error al cargar los datos iniciales');
      console.error('Error:', error);
    }
  };

  const calcularComisiones = async ({ fechaInicio, fechaFin }) => {
    setLoading(true);
    setError('');

    try {
      const response = await comisionesAPI.calcular({
        fecha_inicio: format(fechaInicio, 'yyyy-MM-dd'),
        fecha_fin: format(fechaFin, 'yyyy-MM-dd'),
      });

      setResumenComisiones(response.data);
    } catch (error) {
      setError('Error al calcular las comisiones');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const estadisticas = {
    totalVendedores: usuarios.length,
    totalVentas: ventas.length,
    montoTotal: ventas.reduce((sum, venta) => sum + venta.monto, 0),
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Sistema de Cálculo de Comisiones
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Calcula y analiza las comisiones de ventas por período
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <FiltroFechas onCalcular={calcularComisiones} loading={loading} />

      <TablaComisiones resumenComisiones={resumenComisiones} />

      <TarjetasInformativas
        usuarios={usuarios}
        reglasComision={reglasComision}
        estadisticas={estadisticas}
      />
    </Container>
  );
};

export default Home;