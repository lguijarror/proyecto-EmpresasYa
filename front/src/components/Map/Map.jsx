import PropTypes from 'prop-types';
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useJsApiLoader } from '@react-google-maps/api';

const center = {
  lat: 40.484859888817205,
  lng: -3.7230726779006367
};

const Map = ({ locations }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCj09lN8tpjDD7lrEyumuqOGEtG3_utP8k"
  });

  if (loadError) {
    return <div>Error al cargar el mapa</div>;
  }

  if (!isLoaded) {
    return <div>Cargando...</div>;
  }

  return (
    <GoogleMap
      center={center}
      zoom={15}
    >
      {locations.map((location, index) => (
        <Marker key={index} position={location} />
      ))}
    </GoogleMap>
  );
};

Map.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired
  })).isRequired
};

export default Map;
