import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../services/ApiUrl/apiUrl";
import Container from "react-bootstrap/esm/Container";
import BreadCrumb from "../components/BreadCrumb/BreadCrumb";
import MapaEmpresaDetalle from "../components/Map/MapaEmpresaDetalle";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Carousel from "react-bootstrap/Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebook,
  faInstagram,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import Lightbox from "bs5-lightbox";

const EmpresaDetalle = () => {
  const { id } = useParams();
  const [empresa, setEmpresa] = useState(null);

  const [pages] = useState([
    { link: "/directorio", page: "Directorio de empresas" },
    { link: "", page: "Ficha de empresa" },
  ]);

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const route = `/empresas/${id}`;
        const response = await axios.get(apiUrl + route);
        setEmpresa(response.data.data);
      } catch (error) {
        console.error("Error obteniendo empresa", error);
      }
    };

    fetchEmpresa();
  }, [id]);

  useEffect(() => {
    if (empresa) {
      const lightboxElements = document.querySelectorAll('[data-toggle="lightbox"]');
      lightboxElements.forEach(
        el => el.addEventListener('click', Lightbox.initialize)
      );
    }
  }, [empresa]);

  if (!empresa) {
    return <div className="text-center p-5"><h2>Cargando...</h2></div>;
  }

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const isMobile = window.innerWidth <= 992;
  const fotoChunks = chunkArray(empresa.galeriaFotos, isMobile ? 1 : 3);



  return (
    <div className="landing-page">
      <div className="content">
        <Container className="d-company">
          <BreadCrumb pages={pages} />

          <Row>
            <Col lg={12} xs={12} className="d-company-name">
              <div className="jumbotron">
                <div className="d-flex">
                  <div>
                    <img src={empresa.logo} alt={empresa.nameEmpresa} />
                  </div>
                  <div>
                    <h2 className="display-4">{empresa.nameEmpresa}</h2>
                    <p className="lead">{empresa.categoria}</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={6} xs={12} className="d-company-info">
              {empresa.listaProd && empresa.listaProd.length > 0 && (
                <p>
                  <strong>Productos:</strong>{" "}
                  {empresa.listaProd.length > 1
                    ? empresa.listaProd.join(", ")
                    : empresa.listaProd[0]}
                </p>
              )}
              {empresa.listaServ && empresa.listaServ.length > 0 && (
                <p>
                  <strong>Servicios:</strong>{" "}
                  {empresa.listaServ.length > 1
                    ? empresa.listaServ.join(", ")
                    : empresa.listaServ[0]}
                </p>
              )}
              <p>
                <strong>Dirección:</strong> {empresa.direccion},{" "}
                {empresa.codigoPostal}
              </p>
              <p>
                <strong>Parada de Metro:</strong> {empresa.paradaMetro}
              </p>
              {empresa.telefono && empresa.telefono.length > 0 && (
                <div>
                  <strong>{empresa.telefono.length > 1 ? "Teléfonos" : "Teléfono"}:</strong>
                  <ul style={{display:'flex', listStyleType: "none"}}>
                    {empresa.telefono.map((tel, index) => (
                      <li style={{margin: "0 15px 0 0"}}key={index}>
                        <a href={`tel:${tel}`}><FontAwesomeIcon icon={faPhone} className="mx-1" />{tel}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${empresa.email}`}>{empresa.email}</a>
              </p>
              <p>
                <strong>Web:</strong>{" "}
                <a
                  href={empresa.web}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {empresa.web}
                </a>
              </p>
              <p>
                <strong>Redes Sociales:</strong>
              </p>
              {empresa.redes && empresa.redes.length > 0 && (
                <div>
                  <ul className="d-company--social-links">
                    {empresa.redes.map((red, index) => (
                      <li key={index}>
                        <a
                          href={red.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {red.redSocial === "Twitter" && (
                            <FontAwesomeIcon icon={faTwitter} />
                          )}
                          {red.redSocial === "Facebook" && (
                            <FontAwesomeIcon icon={faFacebook} />
                          )}
                          {red.redSocial === "Instagram" && (
                            <FontAwesomeIcon icon={faInstagram} />
                          )}
                          {red.redSocial === "LinkedIn" && (
                            <FontAwesomeIcon icon={faLinkedin} />
                          )}
                          {red.redSocial === "YouTube" && (
                            <FontAwesomeIcon icon={faYoutube} />
                          )}
                          {/* Mostrar un icono genérico en caso de no coincidir con ninguna red social conocida */}
                          {[
                            "Twitter",
                            "Facebook",
                            "Instagram",
                            "LinkedIn",
                            "YouTube",
                          ].indexOf(red.redSocial) === -1 && (
                            <FontAwesomeIcon icon={faLink} /> 
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {empresa.whatsapp && (
                <p>
                  <a
                    href={`https://wa.me/${empresa.telWhatsapp}?text=Hola+${empresa.nameEmpresa}+he+encontrado+tu+empresa+a+través+de+EmpresasYa%21+y+tengo+una+consulta%3A`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success mt-3 mx-3"
                    style={{ backgroundColor: "#25D366", borderColor: "#25D366" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" style={{height: "20px", marginRight: "10px", marginBottom: "3px"}} viewBox="0 0 448 512"><path style={{filter: "invert()"}} d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
                    Contactar por WhatsApp
                  </a>
                </p>
              )}
            </Col>
            <Col lg={6} xs={12} className="d-company-map">
              <MapaEmpresaDetalle empresa={empresa} />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col lg={12} xs={12} className="d-company-photos">
              <Carousel indicators={false}  interval={null}>
                {fotoChunks.map((fotoChunk, index) => (
                  <Carousel.Item key={index}>
                    <div className="d-flex justify-content-around">
                      {fotoChunk.map((foto, idx) => (
                        <a key={idx} href={foto} data-toggle="lightbox" data-gallery="photos-gallery">

                          <img
                            key={idx}
                            src={foto}
                            alt={`Foto ${index * 3 + idx + 1}`}
                          />
                       </a>
                      ))}
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default EmpresaDetalle;
