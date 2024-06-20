const Empresas = require("./empresas.model");
const User = require("../user/user.model");

const create = async (req, res, next) => {
  try {

    const logo = req.files['logo'] ? req.files['logo'][0].path : null;
    const galeriaFotos = req.files['galeriaFotos'] ? req.files['galeriaFotos'].map(file => file.path) : [];

    const empresaData = {
      ...req.body,
      logo,
      galeriaFotos
    };

    const empresa = await Empresas.create(empresaData);

    const userId = req.authority.id;
    
    await User.findByIdAndUpdate(userId, { $push: { empresasCreadas: empresa._id } });

    res.json({
      status: 201,
      msg: 'Empresa creada y añadida al usuario',
      data: empresa,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const empresas = await Empresas.findById(id);
    res.json({
      status: 200,
      msg: "ok",
      data: empresas,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const empresas = await Empresas.find();
    res.json({
      status: 200,
      msg: "ok",
      data: empresas,
    });
  } catch (error) {
    next(error);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const empresa = await Empresas.findByIdAndUpdate(id, body, {
      new: true,
    });
    res.json({
      status: 200,
      msg: "ok",
      data: empresa,
    });
  } catch (error) {
    next(error);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const empresa = await Empresas.findByIdAndDelete(id);
    res.json({
      status: 200,
      msg: "ok",
      data: empresa,
    });
  } catch (error) {
    next(error);
  }
};

const approveEmpresa = async (req, res, next) => {
  try {
    const { id } = req.params;

    const empresa = await Empresas.findById(id);

    if (!empresa) {
      return res.status(404).json({ message: 'Empresa no encontrada' });
    }

    empresa.aprobada = true;
    await empresa.save();

    res.status(200).json({ message: 'Empresa aprobada exitosamente', empresa });
  } catch (error) {
    console.error('Error al aprobar la empresa:', error);
    next(error);
  }
};

module.exports = { create, getOne, getAll, updateOne, deleteOne, approveEmpresa };
