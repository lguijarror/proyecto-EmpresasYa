import axios from 'axios';
import { apiUrl } from './ApiUrl/apiUrl';

const getAuthToken = () => {
  return localStorage.getItem('token'); 
};

export const fetchEmpresas = async () => {
  try {
    const route = "/empresas";
    const response = await axios.get(apiUrl + route);
    return response.data.data;
  } catch (error) {
    console.error('Error obteniendo empresas', error);
    throw error;
  }
};

export const fetchUnaEmpresa = async (id) => {
  try {
    const route = `/empresas/${id}`;
    const response = await axios.get(apiUrl + route);
    console.log(response.data)
    return response.data.data;
  } catch (error) {
    console.error('Error obteniendo empresa', error);
    throw error;
  }
};

export const approveEmpresa = async (empresaId) => {
  try {
    const response = await axios.patch(`${apiUrl}/empresas/approve/${empresaId}`, {}, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error aprobando empresa:', error);
    throw error;
  }
};

export const createEmpresa = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/empresas/register`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creando empresa:', error);
    throw error;
  }
};

export const deleteEmpresa = async (empresaId) => {
  try {
    const response = await axios.delete(`${apiUrl}/empresas/${empresaId}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error eliminando empresa:', error);
    throw error;
  }
};
