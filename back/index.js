const express = require("express");
const path = require("path");
const cors = require("cors");  // Importa el middleware cors
require("dotenv").config();
const userRouter = require("./api/user/user.router"); // Import user router
const empresaRouter = require("./api/empresas/empresas.router");
const passwordValidationRouter = require("./api/passwordValidation/passwordValidation.router"); // Importa el nuevo router
const { connectMongo } = require("./utils/db");
const {
  notFoundHandler,
  errorHandler,
} = require("./api/middleware/error.middleware");

// Configuración
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar CORS
const corsOptions = {
  origin: `*`,
  methods: "GET,PUT,POST,DELETE,PATCH",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
};

app.use(cors(corsOptions));

connectMongo();

// Endpoints
app.get("/", (req, res) => {
  res.json({ message: "El servidor está funcionando" });
});

// Route '/usuarios' to userRouter
app.use("/user", userRouter);
app.use("/empresas", empresaRouter);
app.use("/password", passwordValidationRouter);

// Manejo de excepciones / errores
app.use(notFoundHandler);
app.use(errorHandler);

// Activar servidor
app.listen(PORT, () => {
  console.log(`El servidor se ha iniciado en el puerto ${PORT}`);
}).on('error', (err) => {
  console.error('Error al iniciar el servidor:', err);
});
