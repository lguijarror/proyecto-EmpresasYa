import Container from "react-bootstrap/esm/Container"
import BreadCrumb from "../components/BreadCrumb/BreadCrumb"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import InfoComercial from "../components/InfoComercial/InfoComercial"
import { useContext, useState } from "react"
import UserContext from "../context/UserContext"
import { Link } from "react-router-dom"

const EmpresasComercial = () => {
    const { user } = useContext(UserContext);

    const [pages] = useState([
        { link: '', page: 'Registra tu empresa' }
      ]);

    return (
        <div className="landing-page">

            <div className="content">
                
                <Container>
                    <BreadCrumb pages={pages} />

                    <Row>
                        <Col lg={12} xs={12}>

                            <p className="text-justify"><b>EmpresasYa!</b> es una innovadora plataforma digital que permite a las empresas locales registrarse y destacar su presencia en un mapa interactivo mediante la API de Google Maps. Con funcionalidades que incluyen la exhibición de productos y servicios, la publicación de datos de contacto y una gestión sencilla a través de un dashboard intuitivo, EmpresasYa! es la herramienta ideal para potenciar la visibilidad de tu negocio. Te invitamos a conocer las ventajas de unirte a EmpresasYa! y descubrir cómo podemos ayudarte a alcanzar nuevas oportunidades y un mayor reconocimiento en el mercado local.</p>
                        </Col>
                    </Row>

                     <hr/>
                    <InfoComercial/>
                     <hr/>
                    <Row>
                        <Col className="mt-4" lg={12} xs={12}>
                            <h3>¿Quieres que tu empresa alcance un nuevo nivel de exposición y oportunidades?</h3>
                            <p className="text-justify">¡Regístrala hoy en EmpresasYa! y empieza a disfrutar de los beneficios de estar presente en la plataforma más dinámica y conectada del sector. No pierdas la oportunidad de hacer que tu empresa sea vista y reconocida. Únete a nosotros y da el primer paso hacia un futuro lleno de posibilidades.</p>
                            <h3>¡Estamos aquí para ayudarte a triunfar!</h3>
                            <p className="text-justify">En EmpresasYa!, creemos en el potencial de cada negocio y trabajamos para ofrecerte las mejores herramientas para tu crecimiento. Con nuestra plataforma, tu empresa no solo ganará visibilidad, sino que también se posicionará como una opción confiable y profesional en el mercado local. No esperes más y regístrate hoy para comenzar a experimentar todas las ventajas que EmpresasYa! tiene para ofrecerte. ¡Tu éxito es nuestro compromiso!</p>
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={12} xs={12} className="text-center">
                        
                        {
                            user && !user.data.user.admin
                             && 
                            <Link className="btn" to="/empresas/crear">Registrar empresa</Link> 
                        }
                        </Col>
                    </Row>
                    
                </Container>
            </div>
         
      </div>
    )
  }
  
  export default EmpresasComercial