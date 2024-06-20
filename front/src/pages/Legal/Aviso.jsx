/* eslint-disable react/no-unescaped-entities */
import Container from "react-bootstrap/esm/Container";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import { useState } from "react";
import DarkTitle from "../../components/Title/DarkTitle";

const Aviso = () => {
  const [pages] = useState([
    {link: '', page: 'Aviso legal' }
  ]);

  return (
    <div className="landing-page">
      <div className="content">
      <Container>
        <BreadCrumb pages={pages} />
        <div>
          <DarkTitle title='Aviso Legal'/>
          <p className="mb-3">
            El sitio web "EmpresasYa! Directorio de Empresas" es propiedad de EmpresasYa S.L.
          </p>
          <p><b>Nombre de la empresa:</b> EmpresasYa S.L.</p>
          <p><b>Dirección:</b> Calle Inventada 42</p>
          <p><b>Teléfono:</b> 666 55 44 33</p>
          <p><b>Email:</b> info@empresasya.es</p>
          <p className="mt-3">
            Los derechos de propiedad intelectual del sitio web, su código
            fuente, diseño, estructura de navegación, bases de datos y los
            distintos elementos en él contenidos son propiedad de EmpresasYa S.L.,
            a quien corresponde el ejercicio exclusivo de
            los derechos de explotación de los mismos en cualquier forma y, en
            especial, los derechos de reproducción, distribución, comunicación
            pública y transformación.
          </p>
          <p>
            El acceso al sitio web es responsabilidad exclusiva de los usuarios.
            El simple acceso al sitio web no implica entablar ningún tipo de
            relación comercial entre EmpresasYa S.L. y el
            usuario.
          </p>
          <p>
            El acceso y navegación en este sitio web implica aceptar y conocer
            las advertencias legales, condiciones y términos de uso contenidos
            en ella.
          </p>
        </div>
      </Container>
      </div>
    </div>
  );
};

export default Aviso;
