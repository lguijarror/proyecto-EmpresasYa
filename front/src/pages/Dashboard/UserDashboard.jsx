import { useState } from 'react';
import { Link } from "react-router-dom";

import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import UserCard from "../../components/UserDashboard/UserCard";
import EmpresasRegistradas from "../../components/UserDashboard/EmpresasRegistradas";

const UserDashboard = () => {
  const [pages] = useState([
    {link: '', page: 'Panel de administración' }
  ]);

  // Aquí se manejará la lógica del panel de usuario
  return (
    <div className='landing-page'>
      <div className='content'>
        <Container className='dashboard user-dashboard'>
        <BreadCrumb pages={pages} />
          <Row>
            <Col lg={6} xs={12} className='mb-5'>
              <UserCard />
            </Col>
            <Col lg={6} xs={12} className='mb-5'>
              <EmpresasRegistradas/>
            </Col>
          </Row>
          <Row>
            <Col lg={12} xs={12}>
              <Link className="btn btn-register-company" to="/empresas/crear">Registrar nueva empresa</Link> 
            </Col>
            
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default UserDashboard;