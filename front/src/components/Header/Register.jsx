/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import registerService from "../../services/register";
import UserContext from '../../context/UserContext';
import Alert from 'react-bootstrap/Alert';

const Register = () => {
  //Modal show
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Send register form
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [conditions, setConditions] = useState(false);
  const { saveUser } = useContext(UserContext);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const user = await registerService.register({
        nombre,
        apellidos,
        telefono,
        password,
        email,
        tipoUsuario,
        conditions

      });
      saveUser(user);


    } catch (error) {

      setAlertMessage("Usuario no registrado correctamente.");
      setAlertVariant("danger");
      setShowAlert(true);

      const timeout = setTimeout(() => {
        setShowAlert(false);
      }, 5000);


      return () => {

        clearTimeout(timeout);
      };

    }
  };


  return (
    <>
      <Button variant="primary" onClick={handleShow} className='btn-option-user btn'>
        Registro
      </Button>

      <Modal show={show} onHide={handleClose} className='modal-register'>

        <Modal.Header closeButton>
          <Modal.Title>Registro</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce tu nombre"
                name='nombre'
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="apellidos">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Introduce tus apellidos"
                name='apellidos'
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="telefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Introduce tu telefono"
                name='telefono'
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Introduce tu contraseña"
                name='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Introduce tu email"
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId='tipoUsuario'>
              <Form.Label >Tipo de usuario</Form.Label>
              <Form.Select
                className="mb-3"
                name='tipoUsuario'
                value={tipoUsuario}
                onChange={(e) => setTipoUsuario(e.target.value)}
              >
                <option>Selecciona una opción</option>
                <option value="propietario">Propietario</option>
                <option value="gestor">Gestor</option>
                <option value="agencia publicitaria">Agencia publicitaria</option>
                <option value="otro">Otro</option>
              </Form.Select>
            </Form.Group>

            <Form.Check
              type='checkbox'
              name='conditions'
              className='mb-3'
              label='Acepto los términos y condiciones'
              checked={conditions}
              required
              onChange={(e) => setConditions(e.target.checked)}
            />

            <Button variant="primary" type="submit">
              Registrarse
            </Button>
          </Form>

        </Modal.Body>

      </Modal>

      {showAlert && (
        <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible className='info-message'>
          {alertMessage}
        </Alert>
      )}
    </>
  );
}

export default Register;