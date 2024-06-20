import Container from 'react-bootstrap/esm/Container'
import BreadCrumb from '../components/BreadCrumb/BreadCrumb'

import UserContext from '../context/UserContext'
import { useContext, useState } from 'react';


const Perfil = () => {

  const [pages] = useState([
    { link: '', page: 'Perfil' }
  ]);

  const { user } = useContext(UserContext);
  const usuario = user.data.user;

  return (
    <div className='landing-page'>
        <div className="content">
          <Container>
            <BreadCrumb pages={pages} />
            <div className="jumbotron">
              <h1 className="display-6 mb-2">Datos de perfil</h1>
              <p className="lead"><b>Nombre Completo:</b> { usuario.nombre } { usuario.apellido }</p>   
              <p className="lead"><b>Teléfono:</b> { usuario.telefono }</p>   
              <p className="lead"><b>Email:</b> { usuario.email }</p>  
              <p className="lead"><b>Tipo de usuario:</b> { usuario.tipoUsuario }</p>    
            </div>
          </Container>
        </div>
      </div>
  )
}

export default Perfil
