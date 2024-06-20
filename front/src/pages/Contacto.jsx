import Container from 'react-bootstrap/esm/Container';
import BreadCrumb from '../components/BreadCrumb/BreadCrumb';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from "react-bootstrap/Form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
//import nodemailer from 'nodemailer';

const Contacto = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [pages] = useState([
    { link: '', page: 'Contacto' }
  ]);

/*
  const sendEmail = async () => {
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      auth: {
        user: 'your-email@example.com',
        pass: 'your-password',
      },
    });

    const mailOptions = {
      from: 'your-email@example.com',
      to: email,
      subject: 'Hello from ReactJS',
      text: mensaje,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };*/


  return (
    <>   
       <div className='landing-page'>
        <div className="content">
          <Container>
            <BreadCrumb pages={pages} />
            <Row>
            <Col lg={6} xs={12}>
              <Form>  {/*    onSubmit={sendEmail}  */}
                <Form.Group className="mb-3" controlId="nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Introduce tu nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Introduce tu email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3 message-form" controlId="mensaje">
                <FloatingLabel controlId="floatingTextarea2" label="Mensaje">
                  <Form.Control
                    as="textarea"
                    placeholder="Mensaje"
                    name='mensaje'
                    style={{ height: '100px' }}
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                  />
                </FloatingLabel>
                </Form.Group>
                <Button className='btn' variant="primary" type="submit">
                  Enviar
                </Button>
              </Form>
            </Col>
            <Col lg={6} xs={12}>
              <Container className='ml-5'>
              <h3 className='contact-title mt-3 mb-3'>Información de contacto</h3>
              <p className='mb-3'><b>Email:</b> info@empresasya.es</p>
              <p className='mb-3'><b>Telefono:</b> 666 55 44 33</p>
              <p className='mb-3'><b>Dirección:</b> Calle Inventada 42 (TomorrowLand)</p>
              
              </Container>
             
            </Col>
              
            </Row> 

          </Container>
        </div>
       </div>
    </>
  );
};

export default Contacto;
