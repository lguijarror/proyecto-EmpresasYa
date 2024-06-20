/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { fetchEmpresas } from "../../services/empresaService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

const DirectorioSimple = () => {
	const [empresas, setEmpresas] = useState([]);
	const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
	const [categoriaFiltro, setCategoriaFiltro] = useState("");

	useEffect(() => {
		const loadEmpresas = async () => {
			try {
				const empresasData = await fetchEmpresas();
				// Filtrar empresas aprobadas antes de establecer el estado
				const empresasAprobadas = empresasData.filter(
					(empresa) => empresa.aprobada
				);
				setEmpresas(empresasAprobadas);
			} catch (error) {
				console.error("Error obteniendo empresas", error);
			}
		};

		loadEmpresas();
	}, []);

	const sortData = (key) => {
		let direction = "ascending";
		if (sortConfig.key === key && sortConfig.direction === "ascending") {
			direction = "descending";
		}
		setSortConfig({ key, direction });
		setEmpresas((prevEmpresas) => {
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
			return sortConfig.direction === "ascending"
				? <FontAwesomeIcon icon='sort-up' />
				: <FontAwesomeIcon icon='sort-down' />;
		}
		return <FontAwesomeIcon icon={['fas', 'sort']} />;
	};

	const filteredEmpresas = categoriaFiltro
    ? empresas.filter((empresa) => empresa.categoria === categoriaFiltro)
    : empresas;


	return (
		<div className="directorio-container">
			<div className="filter-container">
				<label htmlFor="categoria">Filtrar por categoría:</label>
				<select
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
				</select>
			</div>

			<table className="directorio-tabla directorio-tabla-simple">
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
						<th>Ver empresa</th>
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
								<a href={`/empresa/${empresa._id}`}>Ver empresa</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default DirectorioSimple;
