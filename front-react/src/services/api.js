import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la API:', error);
    return Promise.reject(error);
  }
);

export const usuariosAPI = {
  obtenerTodos: () => api.get('/api/v1/usuarios/'),
  obtenerPorId: (id) => api.get(`/api/v1/usuarios/${id}`),
};

export const ventasAPI = {
  obtenerTodas: (params = {}) => api.get('/api/v1/ventas/', { params }),
  obtenerPorVendedor: (vendedorId) => api.get(`/api/v1/ventas/vendedor/${vendedorId}`),
};

export const comisionesAPI = {
  obtenerReglas: () => api.get('/api/v1/comisiones/reglas'),
  calcular: (filtroFechas) => api.post('/api/v1/comisiones/calcular', filtroFechas),
  obtenerPorVendedor: (vendedorId) => api.get(`/api/v1/comisiones/vendedor/${vendedorId}`),
};

export default api;