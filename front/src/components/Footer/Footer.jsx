import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faXTwitter, faWhatsapp, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {

    return (
      <>
      <div className='footer'>
          <Container fluid>
            <Row>
            <Col lg={4} xs={12} className="text-center b-xs">
                <h5>Siguenos en redes</h5>
                <ul className="social-links mb-5">
                  <li><Link to='https://x.com/empresasya' target="_blank"><FontAwesomeIcon icon={faXTwitter} /></Link></li>  
                  <li><Link to='https://www.facebook.com/empresasya' target="_blank"><FontAwesomeIcon icon={faFacebook} /></Link></li>
                  <li><Link to='https://api.whatsapp.com/send?phone=666554433'><FontAwesomeIcon icon={faWhatsapp} target="_blank"/></Link></li>
                  <li><Link to='https://es.linkedin.com/empresasya' target="_blank"><FontAwesomeIcon icon={faLinkedin} /></Link></li>
                </ul>
            </Col>
            <Col lg={4} xs={12} className="text-center b-xs">
                <h5>Contacto</h5>
                <ul className="mb-5">
                  <li><Link to='mailto:info@empresasya.es'>info@empresasya.es</Link></li>  
                  <li><Link to='tel:+34666554433'>666 55 44 33</Link></li>
                  <li>Calle Inventada 42</li>
                  <li>TomorrowLand</li>
                </ul>
            </Col>
            <Col lg={4} xs={12} className="text-center">
                <h5>Enlaces legales</h5>
                <ul>
                  <li><Link to='/aviso-legal'>Aviso legal</Link></li>  
                  <li><Link to='/politica-cookies'>Política de cookies</Link></li>
                  <li><Link to='/mas-info-cookies'>Más información sobre las cookies</Link></li>
                </ul>
            </Col>
            </Row>
          </Container>
      </div>
      </>
    );
};

export default Footer;