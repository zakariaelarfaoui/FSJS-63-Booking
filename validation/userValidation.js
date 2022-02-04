const joi = require("joi");

const createValidation = (data) => {
  const schema = joi.object({
    firstName: joi.string().required().min(3),
    lastName: joi.string().required().min(3),
    email: joi.string().required().email(),
    role: joi.string().required().valid("owner", "client"),
  });
  return schema.validate(data);
};

const updateValidation = (data) => {
  const schema = joi.object({
    firstName: joi.string().required().min(3),
    lastName: joi.string().required().min(3),
    email: joi.string().required().email(),
    role: joi.string().required().valid("owner", "client"),
    active: joi.boolean().required(),
  });
  return schema.validate(data);
};
module.exports = { createValidation, updateValidation };
