
import PurpleTitle from "../Title/PurpleTitle"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import Card from "react-bootstrap/Card"

const InfoComercial = () => {
    return (
        <>
        <PurpleTitle title="Lo que EmpresasYa! te ofrece" />
        <Row className="register-company-cards m-0"> 
            <Col lg={3} xs={6} className="d-flex justify-content-center mb-3">
                <Card style={{ width: '18rem' }}>
                    <Card.Header className="text-center">
                        <Card.Img variant="top" src="/images/localiza.webp" />
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                        Sitúa tu empresa en el mapa, literalmente
                        </Card.Title>
                        <p>Tu negocio estará en un mapa interactivo gracias a la tecnología de Google Maps, facilitando que los clientes te encuentren fácilmente y mejorando tu presencia en línea.</p>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={3} xs={6} className="d-flex justify-content-center mb-3">
                <Card style={{ width: '18rem' }}>
                    <Card.Header className="text-center">
                        <Card.Img variant="top" src="/images/muestra.webp" />
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                        Muestra tus productos y/o servicios
                        </Card.Title>
                        <p>Destaca tus productos y servicios subiendo fotos y documentación a nuestra plataforma, ofreciendo a tus clientes una experiencia visual detallada y siempre actualizada.</p>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={3} xs={6} className="d-flex justify-content-center mb-3">
                <Card style={{ width: '18rem' }}>
                    <Card.Header className="text-center">
                        <Card.Img variant="top" src="/images/facilita.webp" />
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                        Publica tus datos de contacto y localización
                        </Card.Title>
                        <p>Facilita la comunicación con tus clientes publicando tu dirección, teléfono, correo electrónico y enlaces a redes sociales, asegurando que tus datos estén siempre accesibles.</p>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={3} xs={6} className="d-flex justify-content-center mb-3">
                <Card style={{ width: '18rem' }}>
                    <Card.Header className="text-center">
                        <Card.Img variant="top" src="/images/potencia.webp" />
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                        Potencia tu visibilidad y aumenta tu clientela
                        </Card.Title>
                        <p>Mejora tu posicionamiento en motores de búsqueda con nuestro directorio optimizado para SEO, haciendo que tu empresa sea más fácil de encontrar y aumentando su visibilidad.</p>
                    </Card.Body>
                </Card>
            </Col>

        </Row>
        </>
    );
};

export default InfoComercial;