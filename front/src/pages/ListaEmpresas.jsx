/* eslint-disable no-unused-vars */
import Directorio from '../components/Directorio/Directorio';
import Container from 'react-bootstrap/esm/Container';
import BreadCrumb from '../components/BreadCrumb/BreadCrumb';
import { useState } from 'react';


const ListaEmpresas = () => {
  const [pages] = useState([
    { link: '', page: 'Directorio de empresas' }
  ]);
  
    return (
      <div className='landing-page'>
        <div className="content">
          <Container>
            <BreadCrumb pages={pages} />

            <Directorio/>
          </Container>
        </div>
      </div>
    );
  };

export default ListaEmpresas
