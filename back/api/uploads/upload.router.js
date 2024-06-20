const express = require('express');
const { upload, uploadFile } = require('./upload.controller');
const { isAuth } = require("../middleware/auth.middleware");


const router = express.Router();

router.post('/', upload, uploadFile);

module.exports = router;
