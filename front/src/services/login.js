import axios from "axios";

const apiUrl = "https://directorio-empresas.vercel.app";
//const apiUrl = "http://localhost:3000";

const route = "/user/login";

const login = async (credentials) => {
  try {
    const { data } = await axios.post(apiUrl + route, credentials);
    return data;
  } catch (error) {
    throw new Error("Error de inicio de sesión: " + error.message);
  }
};

export default { login };

