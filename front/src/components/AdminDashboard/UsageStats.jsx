/* eslint-disable no-unused-vars */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import Card from "react-bootstrap/Card";
import { fetchEmpresas } from "../../services/empresaService";
import { useEffect, useState } from "react";
import { fetchUsers } from "../../services/userService";

const UsageStats = () => {
  const [empresas, setEmpresas] = useState([]);
  const [numEmpresas, setNumEmpresas] = useState(0);

  const [usuarios, setUsuarios] = useState([]);
  const [numUsuarios, setNumUsuarios] = useState(0);

  useEffect(() => {
    const loadEmpresas = async () => {
      try {
        const empresasData = await fetchEmpresas();
        setEmpresas(empresasData);
        setNumEmpresas(empresasData.length);
      } catch (error) {
        console.error("Error obteniendo empresas", error);
      }
    };

    loadEmpresas();
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsuarios(usersData);
        setNumUsuarios(usersData.length);
      } catch (error) {
        console.error("Error obteniendo usuarios", error);
      }
    };

    loadUsers();
  }, []);

  return (
    <Card>
      <Card.Header>
        <Card.Subtitle>Datos del directorio</Card.Subtitle>
      </Card.Header>

        <Card.Body>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Tipo</TableHeaderCell>
                <TableHeaderCell className="text-right">
                  Cantidad
                </TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Usuarios</TableCell>
                <TableCell className="text-right">{numUsuarios}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Empresas</TableCell>
                <TableCell className="text-right">{numEmpresas}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card.Body>
    </Card>
  );
};

export default UsageStats;
