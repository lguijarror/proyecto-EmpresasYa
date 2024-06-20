import axios from "axios";


const apiUrl = "https://directorio-empresas.vercel.app";
//const apiUrl = "http://localhost:3000";

const route = "/user/register";

const register = async (params) => {
    try{
        const { data } = await axios.post(apiUrl + route, params);
        return data;
    } catch (error) {
        throw new Error("Error en el registro: " + error.message);
    }
};

export default { register };