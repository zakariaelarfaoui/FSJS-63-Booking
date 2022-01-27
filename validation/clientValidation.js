const joi = require("joi");

const createValidation = (data) => {
  const schema = joi.object({
    firstName: joi.string().required().min(3),
    lastName: joi.string().required().min(3),
    email: joi.string().required().email(),
  });
  return schema.validate(data);
};

module.exports = createValidation ;
