const bcrypt = require("bcryptjs");

exports.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

exports.comparePasswords = async (inputPassword, savedPassword) => {
  return await bcrypt.compare(inputPassword, savedPassword);
};