const mongoose = require("mongoose");

const empresasSchema = new mongoose.Schema({
    nameEmpresa: { type: String, required: true, trim: true, unique: true },
    categoria: { type: String, required: true },
    prodServ: { type: String, enum: ['Productos', 'Servicios', 'Ambos'], required: true },
    listaProd: { type: Array },
    listaServ: { type: Array },
    logo: { type: String, required: true, trim: true },
    galeriaFotos: { type: [String] },
    direccion: { type: String, required: true, trim: true },
    codigoPostal: { type: Number, required: true, trim: true },
    paradaMetro: { type: String },
    locMapa: { type: [Number], required: true },
    telefono: { type: [String], trim: true },
    email: { type: String, required: true, trim: true },
    web: { type: String },
    redes: [{
        redSocial: {
            type: String,
            enum: ['Facebook', 'Twitter', 'Instagram', 'LinkedIn', 'YouTube', 'Otra']
        },
        url: String
    }],
    whatsapp: { type: Boolean },
    telWhatsapp: { type: Number, trim: true },
    condiciones: { type: Boolean },
    aprobada: { type: Boolean, required: true, default: false },
    popularidad: { type: Number, default: 0, min: [0, 'La popularidad debe ser un número positivo'] }
}, { timestamps: true });

const Empresas = mongoose.model("Empresas", empresasSchema);

module.exports = Empresas;
