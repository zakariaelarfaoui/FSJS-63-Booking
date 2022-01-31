const joi = require("joi");

const createHotelValidation = (data) => {
  const schema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    type: joi.string().required(),
    // images: joi.array().min(4).max(8).required(),
    rating: joi
      .string()
      .required()
      .valid("Tourist", "Standard", "Comfort", "First Class", "Luxury"),
    address: joi.array().items(
      joi.object({
        street: joi.string().required(),
        city: joi.string().required(),
        country: joi.string().required(),
      })
    ),
    // rooms: joi.array().items(
    //   joi.object({
    //     number: joi.number().required(),
    //     type: joi.string(),
    //     numberOfPerson: joi.number(),
    //     prix: joi.string(),
    //     images: joi.array().min(4).required(),
    //   })
    // ),
  });
  return schema.validate(data);
};

module.exports = { createHotelValidation };
