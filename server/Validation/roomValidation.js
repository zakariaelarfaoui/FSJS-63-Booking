const joi = require("joi");

const roomValidation = (data) => {
  const schema = joi.object({
    number: joi.number().required(),
    type: joi.string().required(),
    numberOfPerson: joi.number().required(),
    price: joi.string().required(),
    images: joi.array().min(8).max(8),
    hotelId: joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = roomValidation;
