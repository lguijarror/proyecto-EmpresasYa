const User = require("./user.model");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const { nombre, apellidos, telefono, password, email, conditions, tipoUsuario } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        status: 400,
        message: "This email has already been used.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar la fecha de registro
    const newUser = new User({
      nombre,
      apellidos,
      telefono,
      password: hashedPassword,
      email,
      conditions,
      tipoUsuario,
      fechaRegistro: new Date(), // Guarda la fecha actual de registro
    });
    const userDB = await newUser.save();

    const token = jwt.sign(
      {
        id: userDB._id,
        email: userDB.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      status: 201,
      data: {message: `User ${userDB.email} created`, user: userDB, token : token },
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userInfo = await User.findOne({ email });

    if (!userInfo) {
      return res.status(400).json({
        status: 400,
        message: "Invalid credentials - No user found",
        data: null,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, userInfo.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        status: 400,
        message: "Invalid credentials - No password match",
        data: null,
      });
    }

    // Guardar la última fecha de conexión
    userInfo.ultimaConexion = new Date();
    await userInfo.save();

    const token = jwt.sign(
      {
        id: userInfo._id,
        email: userInfo.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Ocultar contraseña en la respuesta por seguridad
    userInfo.password = "*************";

    return res.status(200).json({
      data: { message: "ok", user: userInfo, token: token },
    });
  } catch (error) {
    return next(error);
  }
};

const logout = (req, res, next) => {
  try {
    const token = null;
    return res.status(200).json({
      status: 200,
      message: "Logout successful",
    });
  } catch (error) {
    return next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const usuarios = await User.find();
    res.json({
      status: 200,
      msg: "ok",
      data: usuarios,
    });
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res) => {
  try {
    const empresasCreadas = await User.find({_id:req.authority.id}).populate("empresas");
      return res.status(200).json({
        status: 200,
        msg: "ok",
        data: empresasCreadas,
      });
  } catch (error) {
    next(error)
  }
}

module.exports = { register, login, logout, get, profile };
