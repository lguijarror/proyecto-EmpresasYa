import { useEffect, useState } from 'react'
import { fetchEmpresas } from '../../services/empresaService'
import Container from 'react-bootstrap/esm/Container'

import LightTitle from '../Title/LightTitle'
import Carousel from 'react-bootstrap/Carousel';

import Card from "react-bootstrap/Card"
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

const DirectorioGridRecientes = () => {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    const loadEmpresas = async () => {
      try {
        const empresasData = await fetchEmpresas();
        // Filtrar empresas aprobadas y ordenar por fecha de creación descendente
        const empresasAprobadas = empresasData.filter(empresa => empresa.aprobada);
        const sortedEmpresas = empresasAprobadas.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        // Tomar las 9 empresas más recientes
        const empresasRecientes = sortedEmpresas.slice(0, 15);
        setEmpresas(empresasRecientes);
      } catch (error) {
        console.error('Error obteniendo empresas', error);
      }
    };

    loadEmpresas();
  }, []);

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const isMobile = window.innerWidth <= 922;
  const empresaChunks = chunkArray(empresas, isMobile ? 1 : 3);

  return (
    <Container className='recent-companys bloque-oscuro'>
      <LightTitle title="Últimas empresas inscritas" />
      <Carousel interval='3000' indicators={false}>
        {empresaChunks.map((chunk, chunkIndex) => (
          <Carousel.Item key={chunkIndex}>
            <Row>
              {chunk.map((empresa) => (
                <Col key={empresa._id} lg={4} xs={12}>
                  <Card style={{ width: '23rem' }}> 
                  <Card.Header className='d-flex'>
                    <Card.Img variant="top" src={empresa.logo} alt={empresa.nameEmpresa} />
                    <div className='card-titles'>
                      <Card.Title>{empresa.nameEmpresa}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{empresa.categoria}</Card.Subtitle>
                    </div>
                    
                  </Card.Header>  
                    <Card.Body>
                        <p><b>Dirección:</b> {empresa.direccion}</p>
                        <p><b>Teléfono:</b> {empresa.telefono.join(', ')}</p>
                        <p><b>Correo:</b> <a href={`mailto:${empresa.email}`}>{empresa.email}</a></p>
                        <p><b>Web:</b> <a href={empresa.web} target="_blank" rel="noopener noreferrer">{empresa.web}</a></p>

                        <a href={`/empresa/${empresa._id}`} className="btn btn-see-more mt-3">Ver más</a>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>

    
  );
};

export default DirectorioGridRecientes;
