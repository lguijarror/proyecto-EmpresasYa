import { useState, useRef } from "react";
import axios from "axios";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BreadCrumb from "../components/BreadCrumb/BreadCrumb";
import { apiUrl } from "../services/ApiUrl/apiUrl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const FormularioEmpresa = () => {
  const [formData, setFormData] = useState({
    nameEmpresa: "",
    categoria: "",
    prodServ: "",
    listaProd: "",
    listaServ: "",
    logo: null,
    logoPreview: null,
    galeriaFotos: [],
    direccion: "",
    codigoPostal: "",
    paradaMetro: "",
    locMapa: "",
    telefono: "",
    email: "",
    web: "",
    redes: [],
    whatsapp: false,
    telWhatsapp: "",
    condiciones: false,
    aprobada: false,
    popularidad: "",
  });

  const [fileInputs, setFileInputs] = useState([{ id: Date.now(), url: "" }]);
  const [socialInputs, setSocialInputs] = useState([
    { id: Date.now(), platform: "", url: "" },
  ]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("success");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (index === "logo") {
      setFormData((prevState) => ({
        ...prevState,
        logo: file,
        logoPreview: URL.createObjectURL(file),
      }));
    } else {
      const newGaleriaFotos = [...formData.galeriaFotos];
      newGaleriaFotos[index] = file;
      const newFileInputs = [...fileInputs];
      newFileInputs[index].url = URL.createObjectURL(file);
      setFormData((prevState) => ({
        ...prevState,
        galeriaFotos: newGaleriaFotos,
      }));
      setFileInputs(newFileInputs);
    }
  };

  const handleRemoveFile = (index) => {
    const newGaleriaFotos = formData.galeriaFotos.filter((_, i) => i !== index);
    const newFileInputs = fileInputs.filter((_, i) => i !== index);

    setFormData((prevState) => ({
      ...prevState,
      galeriaFotos: newGaleriaFotos,
    }));
    setFileInputs(
      newFileInputs.length > 0 ? newFileInputs : [{ id: Date.now(), url: "" }]
    );
  };

  const handleSocialChange = (e, index) => {
    const { name, value } = e.target;
    const newSocialInputs = [...socialInputs];
    newSocialInputs[index][name] = value;
    setSocialInputs(newSocialInputs);
  };

  const handleAddSocialInput = () => {
    setSocialInputs((prevState) => [
      ...prevState,
      { id: Date.now(), platform: "", url: "" },
    ]);
  };

  const handleRemoveSocial = (index) => {
    const newSocialInputs = socialInputs.filter((_, i) => i !== index);
    setSocialInputs(
      newSocialInputs.length > 0
        ? newSocialInputs
        : [{ id: Date.now(), platform: "", url: "" }]
    );
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      if (key === "listaProd" || key === "listaServ") {
        const arrayValue = formData[key]
          ? formData[key]
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item !== "")
          : [];
        arrayValue.forEach((item, index) => {
          data.append(`${key}[${index}]`, item);
        });
      } else if (key === "galeriaFotos") {
        formData.galeriaFotos.forEach((file) => {
          data.append("galeriaFotos", file);
        });
      } else if (key === "redes") {
        socialInputs.forEach((red, index) => {
          data.append(`redes[${index}][platform]`, red.platform);
          data.append(`redes[${index}][url]`, red.url);
        });
      } else if (key === "logo") {
        data.append("logo", formData.logo);
      } else if (key === "locMapa") {
        const locArray = formData[key]
          .split(",")
          .map((coord) => parseFloat(coord.trim()));
        locArray.forEach((coord, index) => {
          data.append(`locMapa[${index}]`, coord);
        });
      } else if (key === "whatsapp") {
        data.append("whatsapp", formData.whatsapp);
      } else if (key === "telWhatsapp") {
        data.append("telWhatsapp", formData.telWhatsapp);
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      console.log("Enviando datos:", Object.fromEntries(data.entries()));
      console.log(formData);
      await axios.post(`${apiUrl}/empresas/register`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setFormData({
        nameEmpresa: "",
        categoria: "",
        prodServ: "",
        listaProd: "",
        listaServ: "",
        logo: null,
        logoPreview: null,
        galeriaFotos: [],
        direccion: "",
        codigoPostal: "",
        paradaMetro: "",
        locMapa: "",
        telefono: "",
        email: "",
        web: "",
        redes: [],
        condiciones: false,
        whatsappContacto: "No",
      });

      setFileInputs([{ id: Date.now(), url: "" }]);

      setAlertMessage("Empresa pendiente de validación.");
      setAlertVariant("success");
      setShowAlert(true);
    } catch (error) {
      console.error("Error al crear la empresa", error);
      setAlertMessage("Error al crear la empresa. Inténtelo de nuevo.");
      setAlertVariant("danger");
      setShowAlert(true);
    }
  };

  const moveItem = (dragIndex, hoverIndex, type) => {
    const newItems = type === "file" ? [...fileInputs] : [...socialInputs];
    const [draggedItem] = newItems.splice(dragIndex, 1);
    newItems.splice(hoverIndex, 0, draggedItem);

    if (type === "file") {
      setFileInputs(newItems);
      const newGaleriaFotos = [...formData.galeriaFotos];
      const [draggedFile] = newGaleriaFotos.splice(dragIndex, 1);
      newGaleriaFotos.splice(hoverIndex, 0, draggedFile);
      setFormData((prevState) => ({
        ...prevState,
        galeriaFotos: newGaleriaFotos,
      }));
    } else {
      setSocialInputs(newItems);
    }
  };

  const [pages] = useState([
    { link: "/dashboard", page: "Panel de administración" },
    { link: "", page: "Registra tu empresa" },
  ]);

  const handleRadioChange = (e) => {
    const { id } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      whatsapp: id === 'whatsapp-si',
    }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="landing-page">
        <div className="content">
          <Container>
            <BreadCrumb pages={pages} />
            <Row>
              <Col lg={12} xs={12}>
                {showAlert && (
                  <Alert
                    variant={alertVariant}
                    onClose={() => setShowAlert(false)}
                    dismissible
                    className="info-message"
                  >
                    {alertMessage}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre de la Empresa:</Form.Label>
                    <Form.Control
                      type="text"
                      id="nameEmpresa"
                      name="nameEmpresa"
                      value={formData.nameEmpresa}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="categoria">
                    <Form.Label>Categoría</Form.Label>
                    <Form.Control
                      type="text"
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="prodServ">
                    <Form.Label>Producto o Servicio</Form.Label>
                    <Form.Select
                      name="prodServ"
                      value={formData.prodServ}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Seleccione una opción</option>
                      <option value="Productos">Productos</option>
                      <option value="Servicios">Servicios</option>
                      <option value="Ambos">Ambos</option>
                    </Form.Select>
                  </Form.Group>

                  {(formData.prodServ === "Productos" ||
                    formData.prodServ === "Ambos") && (
                    <Form.Group className="mb-3" controlId="listaProd">
                      <Form.Label>
                        Lista de Productos (separados por comas)
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="listaProd"
                        value={formData.listaProd}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  )}

                  {(formData.prodServ === "Servicios" ||
                    formData.prodServ === "Ambos") && (
                    <Form.Group className="mb-3" controlId="listaServ">
                      <Form.Label>
                        Lista de Servicios (separados por comas)
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="listaServ"
                        value={formData.listaServ}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3" controlId="logo">
                    <Form.Label>Logo</Form.Label>
                    <div className="logo-upload">
                      <Form.Control
                        type="file"
                        name="logo"
                        onChange={(e) => handleFileChange(e, "logo")}
                        required
                      />
                      {formData.logoPreview && (
                        <div className="image-preview">
                          <img src={formData.logoPreview} alt="Logo preview" />
                        </div>
                      )}
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3 array-input">
                    <Form.Label>Galeria de Fotos</Form.Label>
                    <p className="mb-1 sublabel">
                      Ordena la galería de fotos arrastrando los elementos
                    </p>
                    {fileInputs.map((fileInput, index) => (
                      <FileInput
                        key={fileInput.id}
                        id={fileInput.id}
                        index={index}
                        url={fileInput.url}
                        onChange={(e) => handleFileChange(e, index)}
                        onRemove={() => handleRemoveFile(index)}
                        moveItem={moveItem}
                      />
                    ))}
                    <Button
                      type="button"
                      className="array-action-btn"
                      onClick={() =>
                        setFileInputs([
                          ...fileInputs,
                          { id: Date.now(), url: "" },
                        ])
                      }
                    >
                      Añadir Foto
                    </Button>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="direccion">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="codigoPostal">
                    <Form.Label>Código Postal</Form.Label>
                    <Form.Control
                      type="text"
                      name="codigoPostal"
                      value={formData.codigoPostal}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="paradaMetro">
                    <Form.Label>Parada de Metro</Form.Label>
                    <Form.Control
                      type="text"
                      name="paradaMetro"
                      value={formData.paradaMetro}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="locMapa">
                    <Form.Label>Localización en el Mapa</Form.Label>
                    <Form.Control
                      type="text"
                      name="locMapa"
                      value={formData.locMapa}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="telefono">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                      type="text"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="whatsapp-contacto">
                    <Form.Label>
                      ¿Quieres que los clientes te puedan contactar por
                      WhatsApp?
                    </Form.Label>
                    <div key={`default-radio`} className="mb-3">
                      <Form.Check
                        type="radio"
                        id="whatsapp-si"
                        label="Sí"
                        name="whatsapp"
                        value="whatsapp-si"
                        onChange={handleRadioChange}
                        checked={formData.whatsapp === true}
                      />
                      <Form.Check
                        type="radio"
                        id="whatsapp-no"
                        label="No"
                        name="whatsapp"
                        value="whatsapp-no"
                        onChange={handleRadioChange}
                        checked={formData.whatsapp === false}
                      />
                    </div>
                  </Form.Group>

                  {formData.whatsapp === true && (
                    <Form.Group className="mb-3" controlId="telWhatsapp">
                      <Form.Label>Teléfono para WhatsApp</Form.Label>
                      <Form.Control
                        type="tel"
                        name="telWhatsapp"
                        value={formData.telWhatsapp}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="web">
                    <Form.Label>Sitio web</Form.Label>
                    <Form.Control
                      type="text"
                      name="web"
                      value={formData.web}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 array-input">
                    <Form.Label>Redes Sociales</Form.Label>
                    {socialInputs.map((socialInput, index) => (
                      <SocialInput
                        key={socialInput.id}
                        id={socialInput.id}
                        index={index}
                        platform={socialInput.platform}
                        url={socialInput.url}
                        onChange={(e) => handleSocialChange(e, index)}
                        onRemove={() => handleRemoveSocial(index)}
                        moveItem={moveItem}
                      />
                    ))}
                    <Button
                      type="button"
                      className="array-action-btn"
                      onClick={handleAddSocialInput}
                    >
                      Añadir Red Social
                    </Button>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="condiciones">
                    <Form.Check
                      type="checkbox"
                      name="condiciones"
                      checked={formData.condiciones}
                      onChange={handleChange}
                      label="Acepto los términos y condiciones"
                      required
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    className="request-button approve-button"
                  >
                    Registrar Empresa
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </DndProvider>
  );
};

const FileInput = ({ id, index, url, onChange, onRemove, moveItem }) => {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: "file",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, drop] = useDrop({
    accept: "file",
    hover: (item) => {
      if (item.index !== index) {
        moveItem(item.index, index, "file");
        item.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div ref={ref} className={`draggable-item ${isDragging ? "dragging" : ""}`}>
      <Form.Control type="file" id={id} onChange={onChange} />
      {url && (
        <>
          <div className="image-preview">
            <img src={url} alt="Preview" />
          </div>
          <Button variant="danger" onClick={onRemove}>
          <FontAwesomeIcon icon={faXmark} />          </Button>
        </>
      )}
    </div>
  );
};

const SocialInput = ({
  index,
  platform,
  url,
  onChange,
  onRemove,
  moveItem,
}) => {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: "social",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const [, drop] = useDrop({
    accept: "social",
    hover: (item) => {
      if (item.index !== index) {
        moveItem(item.index, index, "social");
        item.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div ref={ref} className={`draggable-item ${isDragging ? "dragging" : ""}`}>
      <Form.Select
        name="platform"
        onChange={(e) => onChange(e, index)}
        value={platform}
      >
        <option value="">Elige una red social</option>
        <option value="Facebook">Facebook</option>
        <option value="Twitter">Twitter</option>
        <option value="Instagram">Instagram</option>
        <option value="LinkedIn">LinkedIn</option>
        <option value="YouTube">YouTube</option>
        <option value="Otra">Otra</option>
      </Form.Select>
      <Form.Control
        type="text"
        name="url"
        placeholder="URL"
        value={url}
        onChange={(e) => onChange(e, index)}
      />
      <Button variant="danger" onClick={onRemove}>
      <FontAwesomeIcon icon={faXmark} />        </Button>
    </div>
  );
};

export default FormularioEmpresa;
