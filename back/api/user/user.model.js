const mongoose = require("mongoose");

/* const bcrypt = require("bcrypt");
const salt = 10; */

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    trim: true,
    required: true,
  },
  apellidos: {
    type: String,
    trim: true,
    required: true,
  },
  telefono: {
    type: Number,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  conditions: {
    type: Boolean,
    required: true,
  },
  tipoUsuario: {
    type: String,
    enum: ["propietario", "gestor", "agencia publicitaria", "otro"],
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  ultimaConexion: { type: Date },  
  fechaRegistro: { type: Date },
  empresasCreadas: [{ type: mongoose.Schema.ObjectId, ref: "empresas" }],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
