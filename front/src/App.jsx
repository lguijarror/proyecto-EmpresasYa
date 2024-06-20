import { useEffect, useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

import { UserProvider } from "./context/UserContext";
import AuthRoute from "./components/AuthRoute/AuthRoute";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";


import HomePage from "./pages/HomePage";
import Contacto from "./pages/Contacto";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import Login from "./components/Header/Login";
import Aviso from "./pages/Legal/Aviso";
import Cookies from "./pages/Legal/Cookies";
import Masinfo from "./pages/Legal/Masinfo"
import EmpresaForm from "./pages/EmpresaForm";
import Perfil from "./pages/Perfil";
import ListaEmpresas from "./pages/ListaEmpresas";
import EmpresaDetalle from "./pages/EmpresaDetalle";
import EmpresasComercial from "./pages/EmpresasComercial";

import './App.scss';

const App = () => {
  const [listUsers, setListUsers] = useState([])

  useEffect(() => {
    axios.get("https://directorio-empresas.vercel.app/user/get")
      .then(response => {
        setListUsers(response.data)
      })
  }, [])


  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/directorio" element={<ListaEmpresas />} />
          <Route path="/empresas" element={<EmpresasComercial />} />
          <Route path="/empresas/crear" element={
            <AuthRoute component={<EmpresaForm />} />
          } />
          <Route path="/login" element={<Login listUsers={listUsers} />} />
          <Route path="/dashboard" element={
            <AuthRoute component={<Dashboard />} />
          } />
         
          <Route path="/admin" element={
            <AuthRoute component={<AdminDashboard />} />
          } />

          <Route path="/user" element={
            <AuthRoute component={<UserDashboard />} />
          } />


          <Route path="/panel" element={
            <AuthRoute component={<Dashboard />} />
          } />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/empresa/:id" element={<EmpresaDetalle />} />
          <Route path="/perfil" element={
            <AuthRoute component={<Perfil />} />
          } />
          <Route path="/aviso-legal" element={<Aviso />} />
          <Route path="/politica-cookies" element={<Cookies />} />
          <Route path="/mas-info-cookies" element={<Masinfo />} />
        </Routes>
        <Footer />
      </Router>
    </UserProvider>
  );
};

export default App;