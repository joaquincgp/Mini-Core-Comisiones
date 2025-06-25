import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Chip,
  Box,
} from '@mui/material';
import { People, Rule, TrendingUp } from '@mui/icons-material';

const TarjetasInformativas = ({ usuarios, reglasComision, estadisticas }) => {
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
    <Grid container spacing={3}>
      {/* Vendedores */}
      <Grid item xs={12} md={4}>
        <Card elevation={2} sx={{ height: '100%' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <People color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" color="primary">
                Vendedores
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {usuarios.map((usuario) => (
              <Box key={usuario.id} sx={{ mb: 1, p: 1, borderRadius: 1, backgroundColor: 'grey.50' }}>
                <Typography variant="body2" fontWeight="medium">
                  {usuario.nombre}
                </Typography>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>

      {/* Reglas de Comisión */}
      <Grid item xs={12} md={4}>
        <Card elevation={2} sx={{ height: '100%' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rule color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" color="primary">
                Reglas de Comisión
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            {reglasComision.map((regla) => (
              <Box key={regla.id} sx={{ mb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" fontWeight="medium">
                  ≥ {formatearMoneda(regla.monto_minimo)}
                </Typography>
                <Chip
                  label={formatearPorcentaje(regla.porcentaje)}
                  size="small"
                  color="secondary"
                  variant="outlined"
                />
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>

      {/* Estadísticas */}
      <Grid item xs={12} md={4}>
        <Card elevation={2} sx={{ height: '100%' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrendingUp color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" color="primary">
                Estadísticas
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Total de Vendedores
              </Typography>
              <Typography variant="h6" color="primary">
                {estadisticas.totalVendedores}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Total de Ventas Registradas
              </Typography>
              <Typography variant="h6" color="primary">
                {estadisticas.totalVentas}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Monto Total en Sistema
              </Typography>
              <Typography variant="h6" color="success.main">
                {formatearMoneda(estadisticas.montoTotal)}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default TarjetasInformativas;