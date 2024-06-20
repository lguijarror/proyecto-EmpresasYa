import { useEffect, useState } from "react";
import { fetchEmpresas } from "../../services/empresaService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import FormLabel from "react-bootstrap/esm/FormLabel";

const Directorio = () => {
  const [empresas, setEmpresas] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmpresas, setFilteredEmpresas] = useState([]);

  useEffect(() => {
    const loadEmpresas = async () => {
      try {
        const empresasData = await fetchEmpresas();
        const empresasAprobadas = empresasData.filter(
          (empresa) => empresa.aprobada
        );
        // Ordenar aleatoriamente las empresas aprobadas
        const empresasAleatorias = empresasAprobadas.sort(() => Math.random() - 0.5);
        setEmpresas(empresasAleatorias);
        setFilteredEmpresas(empresasAleatorias);
      } catch (error) {
        console.error("Error obteniendo empresas", error);
      }
    };

    loadEmpresas();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filteredData = empresas.filter((empresa) => {
        return Object.keys(empresa).some((key) =>
          empresa[key].toString().toLowerCase().includes(lowercasedFilter)
        );
      });
      setFilteredEmpresas(
        categoriaFiltro
          ? filteredData.filter(
            (empresa) => empresa.categoria === categoriaFiltro
          )
          : filteredData
      );
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchTerm, categoriaFiltro, empresas]);

  const sortData = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    setFilteredEmpresas((prevEmpresas) => {
      return [...prevEmpresas].sort((a, b) => {
        if (a[key] < b[key]) {
          return direction === "ascending" ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    });
  };

  const getSortIcon = (key) => {
    library.add(fas);
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? (
        <FontAwesomeIcon icon="sort-up" />
      ) : (
        <FontAwesomeIcon icon="sort-down" />
      );
    }
    return <FontAwesomeIcon icon={["fas", "sort"]} />;
  };

  return (
    <div className="directorio-container">
      <div className="barra-busqueda">
        <div className="filter-container">
          <Form.Group controlId="search" className="search-bar">
            <FormLabel >Buscar:</FormLabel>
            <Form.Control
              name="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </div>
        <div className="filter-container">
          <Form.Group className="filter-category">
            <Form.Label htmlFor="categoria">Categorías:</Form.Label>
            <Form.Select
              id="categoria"
              value={categoriaFiltro}
              onChange={(e) => setCategoriaFiltro(e.target.value)}
            >
              <option value="">Todas</option>
              {[...new Set(empresas.map((empresa) => empresa.categoria))].map(
                (categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                )
              )}
            </Form.Select>
          </Form.Group>
        </div>
      </div>

      <table className="directorio-tabla">
        <thead>
          <tr>
            <th>Logotipo</th>
            <th onClick={() => sortData("nameEmpresa")}>
              Nombre {getSortIcon("nameEmpresa")}
            </th>
            <th onClick={() => sortData("categoria")}>
              Categoría {getSortIcon("categoria")}
            </th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Web</th>
            <th>Ver en el mapa</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmpresas.map((empresa, index) => (
            <tr key={index}>
              <td>
                <a href={`/empresa/${empresa._id}`}>
                  <img
                    src={empresa.logo}
                    alt={empresa.nameEmpresa}
                    className="logo-empresa"
                  />
                </a>
              </td>
              <td>
                <a href={`/empresa/${empresa._id}`}>{empresa.nameEmpresa}</a>
              </td>
              <td>{empresa.categoria}</td>
              <td>{empresa.direccion}</td>
              <td>
                {empresa.telefono.map((tel, telIndex) => (
                  <a key={telIndex} href={`tel:${tel}`}>
                    {tel}{" "}
                  </a>
                ))}
              </td>
              <td>
                <a href={`mailto:${empresa.email}`}>{empresa.email}</a>
              </td>
              <td>
                <a href={empresa.web} target="_blank" rel="noopener noreferrer">
                  {empresa.web.replace("https://www.", "")}
                </a>
              </td>
              <td>
                <Link to={`/empresa/${empresa._id}#mapa-empresa-detalle`}>
                  <i className="fa-regular fa-map"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Directorio;
