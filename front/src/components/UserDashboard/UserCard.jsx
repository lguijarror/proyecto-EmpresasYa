import { useContext } from "react";
import Card from "react-bootstrap/Card"
import UserContext from "../../context/UserContext";

const UserCard = () => {

  const { user } = useContext(UserContext);
  const usuario = user.data.user;

  return (
    <Card>
      <Card.Header>
        <Card.Subtitle>Datos de usuario</Card.Subtitle>
      </Card.Header>
        
        <Card.Body>
          <p ><b>Nombre:</b> {usuario.nombre} {usuario.apellidos}</p>
          <p ><b>Teléfono:</b> {usuario.telefono}</p>
          <p ><b>Email:</b> {usuario.email}</p>
          <p ><b>Tipo de usuario:</b> {usuario.tipoUsuario}</p>
        </Card.Body>
    </Card>
  )
}

export default UserCard