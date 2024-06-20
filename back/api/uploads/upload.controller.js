const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');
const path = require('path');
const axios = require('axios');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => {
      const allowedFormats = ['jpg', 'jpeg', 'png', 'webp'];
      const extension = file.mimetype.split('/')[1];
      return allowedFormats.includes(extension) ? extension : 'jpg';
    },
    public_id: (req, file) => {
      const fileName = path.parse(file.originalname).name;
      return `${Date.now()}-${fileName}`;
    },
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Formato de archivo no permitido. Solo se permiten jpg, jpeg, png y webp.'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

exports.uploadMultiple = upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'galeriaFotos', maxCount: 10 }
]);

exports.uploadFile = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No se han subido archivos.');
    }

    const logo = req.files['logo'] ? req.files['logo'][0].path : null;
    const galeriaFotos = req.files['galeriaFotos'] ? req.files['galeriaFotos'].map(file => file.path) : [];

    res.json({
      status: 200,
      message: 'Archivos subidos exitosamente',
      files: { logo, galeriaFotos }
    });
  } catch (error) {
    console.error('Error subiendo archivos a Cloudinary:', error);
    res.status(500).json({
      status: 500 + "ERRROOOOOOOOOR",
      message: 'Error subiendo archivos a Cloudinary',
      error: error.message
    });
  }
};
