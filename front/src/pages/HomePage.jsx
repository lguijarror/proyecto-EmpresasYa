import MapaEmpresas from '../components/Map/MapaEmpresas';
import DirectorioGridRecientes from '../components/Directorio/DirectorioGridRecientes'
import DirectorioGridPopulares from '../components/Directorio/DirectorioGridPopulares'
import InfoComercial from '../components/InfoComercial/InfoComercial';

const HomePage = () => {

  return (
    <div className="home-page">  
      <div className="content">
        <MapaEmpresas apiKey="" />

        <InfoComercial/>
        
        <div className="bg-purple">            
            <DirectorioGridRecientes />
        </div>
        
        <div>
          <DirectorioGridPopulares />
        </div>
      </div>
    </div>
  );
};

export default HomePage;