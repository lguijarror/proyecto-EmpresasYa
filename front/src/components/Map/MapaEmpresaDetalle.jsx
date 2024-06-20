import { useJsApiLoader, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";
import { mapOptions } from "./MapaEmpresas";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const MapaEmpresaDetalle = ({ empresa }) => {
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [hovered, setHovered] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCj09lN8tpjDD7lrEyumuqOGEtG3_utP8k", 
  });

  if (loadError) {
    return <div>Error al cargar el mapa</div>;
  }

  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: parseFloat(empresa.locMapa[0]),
          lng: parseFloat(empresa.locMapa[1]),
        }}
        zoom={15}
        options={mapOptions}
      >
        <Marker
          position={{
            lat: parseFloat(empresa.locMapa[0]),
            lng: parseFloat(empresa.locMapa[1]),
          }}
          onClick={() => setSelectedEmpresa(empresa)}
          icon={{
            url: hovered ? "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png" : "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
          }}
          onMouseOver={() => setHovered(true)}
          onMouseOut={() => setHovered(false)}
        />
        {selectedEmpresa && (
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
                <a href={empresa.web} target="_blank" rel="noopener noreferrer">
                  Visitar
                </a>
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapaEmpresaDetalle;
