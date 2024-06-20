const bcrypt = require('bcryptjs');

const validatePassword = async (req, res, next) => {
  try {
    const { plainTextPassword, hash } = req.body;
    const isMatch = await bcrypt.compare(plainTextPassword, hash);

    return res.status(200).json({
      message: "Password comparison result",
      match: isMatch,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { validatePassword };
