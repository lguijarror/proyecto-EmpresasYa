import Container from "react-bootstrap/esm/Container";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import { useState } from "react";
import DarkTitle from "../../components/Title/DarkTitle";

const Masinfo = () => {
  const [pages] = useState([
    { link: '', page: 'Más información sobre las cookies' }
  ]);

  return (
    <div className="landing-page">
      <div className="content">
        <Container>
          <BreadCrumb pages={pages} />
          <DarkTitle title='Más información sobre las cookies' />

          <h2>¿Qué son las cookies?</h2>
          <p className="mt-3 mb-3">Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (ordenador, tableta o móvil) cuando visita ciertas páginas web. Se utilizan para mejorar su experiencia de navegación, recordar sus preferencias, y proporcionar información a los propietarios del sitio web sobre cómo se utiliza el sitio.</p>

          <h2>¿Por qué usamos cookies?</h2>
          <p className="mt-3 mb-3">Utilizamos cookies por varias razones:</p>
          <ul>
            <li><strong>Mejorar su experiencia de navegación:</strong> Las cookies nos permiten recordar sus preferencias y configuraciones, como el idioma seleccionado, para que no tenga que reconfigurarlas cada vez que visite nuestro sitio.</li>
            <li><strong>Analizar y mejorar el rendimiento del sitio:</strong> Utilizamos cookies para recopilar información sobre cómo los visitantes interactúan con nuestro sitio web. Esto nos ayuda a identificar áreas de mejora y optimizar el rendimiento del sitio.</li>
            <li><strong>Publicidad y marketing:</strong> Las cookies también pueden ser utilizadas para mostrarle anuncios relevantes y medir la efectividad de nuestras campañas publicitarias.</li>
          </ul>

          <h2>Tipos de cookies que utilizamos</h2>
          <ul className="mt-3 mb-3">
            <li><strong>Cookies esenciales:</strong> Estas cookies son necesarias para que el sitio web funcione correctamente. Sin ellas, algunas partes del sitio web no funcionarían.</li>
            <li><strong>Cookies de rendimiento:</strong> Estas cookies recopilan información sobre cómo los visitantes utilizan el sitio web, por ejemplo, qué páginas son las más visitadas. Esta información se utiliza para mejorar el sitio web y su funcionamiento.</li>
            <li><strong>Cookies funcionales:</strong> Estas cookies permiten que el sitio web recuerde las elecciones que hace (como su nombre de usuario, idioma o la región en la que se encuentra) y proporcionan funciones mejoradas y más personales.</li>
            <li><strong>Cookies de marketing:</strong> Estas cookies se utilizan para mostrar anuncios relevantes para usted y sus intereses. También se utilizan para limitar el número de veces que ve un anuncio y para ayudar a medir la efectividad de una campaña publicitaria.</li>
          </ul>

          <h2>Gestión de cookies</h2>
          <p className="mt-3 mb-3">Puede controlar y gestionar las cookies de varias maneras. Tenga en cuenta que eliminar o bloquear las cookies puede afectar su experiencia de usuario y algunas funcionalidades pueden dejar de estar disponibles.</p>
          <ul>
            <li><strong>Configuración del navegador:</strong> La mayoría de los navegadores web le permiten gestionar las cookies a través de las opciones de configuración. Puede configurar su navegador para que rechace cookies, o elimine cookies específicas.</li>
            <li><strong>Herramientas de terceros:</strong> También existen herramientas de terceros que le permiten gestionar las cookies, como extensiones del navegador o programas específicos.</li>
            <li><strong>Preferencias en nuestro sitio web:</strong> En nuestro sitio web, puede encontrar opciones para gestionar sus preferencias de cookies, aceptando o rechazando diferentes tipos de cookies según sus necesidades.</li>
          </ul>

          <h2>Cambios en nuestra política de cookies</h2>
          <p className="mt-3 mb-3">Podemos actualizar nuestra política de cookies de vez en cuando. Le recomendamos revisar esta página periódicamente para estar informado sobre cómo utilizamos las cookies.</p>

          <p>Si tiene alguna pregunta o inquietud sobre nuestra política de cookies, no dude en ponerse en contacto con nosotros.</p>


        </Container>
      </div>
    </div>
  );
};
export default Masinfo;
