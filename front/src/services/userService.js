import axios from 'axios';
import { apiUrl } from './ApiUrl/apiUrl';

const getAuthToken = () => {
  return localStorage.getItem('token'); 
}; 

export const fetchUsers = async () => {
  try {
    const route = "/user/get";
    const response = await axios.get(apiUrl + route,     {  
      headers: {
      Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error obteniendo usuarios', error);
    throw error;
  }
};

/* export const approveEmpresa = async (empresaId) => {
  try {
    const response = await axios.patch(`${apiUrl}/empresas/${empresaId}`, { aprobada: true }, {
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
}; */