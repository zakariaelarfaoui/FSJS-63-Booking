const joi = require("joi");

const registerValidation = (data) => {
  const schema = joi.object({
    firstName: joi.string().required().min(3),
    lastName: joi.string().required().min(3),
    email: joi.string().required().email(),
    password: joi.string().required().min(8),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(8),
  });
  return schema.validate(data);
};

const resetPasswordValidation = (data) => {
  const schema = joi.object({
    password: joi.string().required().min(8),
    confirmPassword: joi.ref("password"),
  });
  return schema.validate(data);
};
module.exports = {
  registerValidation,
  loginValidation,
  resetPasswordValidation,
};
