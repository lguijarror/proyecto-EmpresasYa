import { useEffect, useState } from 'react';
import { fetchEmpresas, approveEmpresa, deleteEmpresa } from '../../services/empresaService';
import Card from "react-bootstrap/Card";
import { appUrl } from '../../services/ApiUrl/apiUrl';

const AprobarSolicitudes = () => {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    const loadEmpresas = async () => {
      try {
        const empresasData = await fetchEmpresas();
        const empresasNoAprobadas = empresasData.filter(empresa => !empresa.aprobada);
        setEmpresas(empresasNoAprobadas);
      } catch (error) {
        console.error('Error obteniendo empresas', error);
      }
    };

    loadEmpresas();
  }, []);

  const handleApprove = async (empresaId) => {
    try {
      await approveEmpresa(empresaId);
      setEmpresas(prevEmpresas => prevEmpresas.filter(empresa => empresa._id !== empresaId));
    } catch (error) {
      console.error('Error aprobando empresa COMPONENTE:', error);
    }
  };

  const handleDelete = async (empresaId) => {
    try {
      await deleteEmpresa(empresaId);
      setEmpresas(prevEmpresas => prevEmpresas.filter(empresa => empresa._id !== empresaId));
    } catch (error) {
      console.error('Error eliminando empresa:', error);
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Subtitle>Aprobación de solicitudes</Card.Subtitle>
        {empresas.length > 0 && (
          <p className='m-0'>{empresas.length} {empresas.length > 1 ? "empresas pendientes" : "empresa pendiente"} de aprobación</p>
        )}      </Card.Header>
      <Card.Body>

        {empresas.length === 0 ? (
          <p>No hay solicitudes pendientes de aprobación</p>
        ) : (
          <ul className="requests-list">
            {empresas.map((empresa) => (
              <li key={empresa._id} className="request-item">
              <a href={`${appUrl}/empresa/${empresa._id}`}>{empresa.nameEmpresa}</a>
                <div className="request-buttons">
                  <button
                    className="request-button approve-button"
                    onClick={() => handleApprove(empresa._id)}
                  >
                    Aprobar
                  </button>
                  <button
                    className="request-button cancel-button"
                    onClick={() => handleDelete(empresa._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card.Body>
    </Card>
  );
};

export default AprobarSolicitudes;