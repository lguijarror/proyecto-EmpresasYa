/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import UserContext from "../../context/UserContext";
import loginService from "../../services/login";


const Login = () => {
  //Modal show
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Send login form
  const [email, setUsermail] = useState("");
  const [password, setPassword] = useState("");
  const {setUser } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
        const user = await loginService.login({
            email,
            password
        });
        setUser(user); //Guarda el usuario en el contexto y en el localStorage
        navigate('/dashboard');
    } catch (error) {
        setErrorMessage ("Error iniciando sesión");
        setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
    }
  };


  return (
    <>
      <Button variant="primary" onClick={handleShow} className='btn-option-user btn btn-option-user-first'>
        Login
      </Button>

      <Modal show={show} onHide={handleClose} className="modal-login">
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="Usermail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Introduce tu email"
                name="Usermail"
                value={email}
                onChange={(e) => setUsermail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="Password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                name="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" />
                    </Form.Group> */}
            <Button variant="primary" type="submit">
              Acceder
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
