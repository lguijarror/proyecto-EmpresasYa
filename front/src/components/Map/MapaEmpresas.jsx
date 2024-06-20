/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import { fetchEmpresas } from "../../services/empresaService";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const containerStyle = {
  width: "100%",
  height: "411px",
};

const center = {
  lat: 40.484859888817205,
  lng: -3.7230726779006367,
};

export const mapOptions = {
  styles: [
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.attraction",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "poi.government",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "poi.medical",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.park",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "poi.place_of_worship",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.school",
      stylers: [{ visibility: "on" }],
    },
    {
      featureType: "poi.sports_complex",
      stylers: [{ visibility: "off" }],
    },
  ],
};

const MapaEmpresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [hoveredEmpresaId, setHoveredEmpresaId] = useState(null);

  useEffect(() => {
    const loadEmpresas = async () => {
      try {
        const empresasData = await fetchEmpresas();
        const empresasAprobadas = empresasData.filter(
          (empresa) => empresa.aprobada
        );
        const empresasAleatorias = empresasAprobadas.sort(() => Math.random() - 0.5);
        setEmpresas(empresasAleatorias);
      } catch (error) {
        console.error("Error obteniendo empresas", error);
      }
    };

    loadEmpresas();
  }, []);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCj09lN8tpjDD7lrEyumuqOGEtG3_utP8k",
  });

  const handleMouseOver = (id) => {
    setHoveredEmpresaId(id);
  };

  const handleMouseOut = () => {
    setHoveredEmpresaId(null);
  };

  if (loadError) {
    return <div>Error al cargar el mapa</div>;
  }

  if (!isLoaded) {
    return <div>Cargando...</div>;
  }

  return (
    <Row className="m-0">
      <Col lg={6} xs={12} className="text-center b-xs col-mapa-inicio">
        <div className="mapa-directorio-container">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            options={mapOptions}
          >
            {empresas.map((empresa) => (
              <Marker
                key={empresa._id}
                position={{
                  lat: parseFloat(empresa.locMapa[0]),
                  lng: parseFloat(empresa.locMapa[1]),
                }}
                onMouseOver={() => setHoveredEmpresaId(empresa._id)}
                onMouseOut={() => setHoveredEmpresaId(null)}
                icon={{
                  url:
                    hoveredEmpresaId === empresa._id
                      ? "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
                      : "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
                }}
                onClick={() => setSelectedEmpresa(empresa)}
              >
                {selectedEmpresa && selectedEmpresa._id === empresa._id && (
                  <InfoWindow
                    position={{
                      lat: parseFloat(empresa.locMapa[0]),
                      lng: parseFloat(empresa.locMapa[1]),
                    }}
                    onCloseClick={() => setSelectedEmpresa(null)}
                  >
                    <div>
                      <h2>{empresa.nameEmpresa}</h2>
                      <p>{empresa.direccion}</p>
                      <p>{empresa.telefono.join(", ")}</p>
                      <p>{empresa.email}</p>
                      <p>
                        <a
                          href={empresa.web.replace(/^https?:\/\//, "")}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visitar
                        </a>
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ))}
          </GoogleMap>
        </div>
      </Col>
      <Col lg={6} xs={12} className="text-center b-xs col-directorio-inicio">
        <div className="directorio-container">
          <table className="directorio-tabla">
            <tbody>
              {empresas.map((empresa, index) => (
                <tr
                  key={index}
                  onMouseOver={() => handleMouseOver(empresa._id)}
                  onMouseOut={handleMouseOut}
                  onClick={() => setSelectedEmpresa(empresa)}
                >
                  <td>
                    <a href={`/empresa/${empresa._id}`}>
                      {empresa.nameEmpresa}
                    </a>
                  </td>
                  <td>{empresa.categoria}</td>
                  <td>{empresa.direccion}</td>
                  <td>
                    <a href={`/empresa/${empresa._id}`}>Ver empresa</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Col>
    </Row>
  );
};

export default MapaEmpresas;
