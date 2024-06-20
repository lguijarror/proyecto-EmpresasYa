import { useEffect, useState } from 'react';
import Card from "react-bootstrap/Card";
import { fetchUsers } from "../../services/userService";

const ListadoUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsuarios(usersData);
      } catch (error) {
        console.error("Error obteniendo usuarios", error);
      }
    };

    loadUsers();
  }, []);

  const formatFecha = (fecha) => {
    if (!fecha) return '';
    return new Date(fecha).toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <Card>
      <Card.Body className='card-body-xl'>
        <table className="listado-usuarios-tabla">
          <thead>
            <tr>
              <th>Usuari@</th>
              <th>Tipo usuario</th>
              <th>Admin</th>
              <th>Teléfono</th>
              <th>Correo electrónico</th>
              <th>Empr. cre.</th>
              <th>Últ. conex.</th>
              <th>Registro</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, index) => (
              <tr key={index}>
                <td>
                  {usuario.nombre} {usuario.apellidos}
                </td>
                <td>{usuario.tipoUsuario}</td>
                <td>{usuario.admin ? 'Sí' : 'No'}</td>
                <td>{usuario.telefono}</td>
                <td>{usuario.email}</td>
                <td>{usuario.empresasCreadas.length}</td>
                <td>{formatFecha(usuario.ultimaConexion)}</td>
                <td>{formatFecha(usuario.fechaRegistro)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );
};

export default ListadoUsuarios;
