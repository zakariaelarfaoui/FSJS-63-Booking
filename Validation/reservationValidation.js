const joi = require("joi");

const reservationValidation = (data) => {
  const schema = joi.object({
    from: joi.date().required(),
    to: joi.date().required(),
    hotelId: joi.string().required(),
    roomId: joi.string().required(),
    clientId: joi.string().required(),
    price: joi.string().required(),
    modeOfReservation: joi.string().required(),
    dateOfConfirmation: joi.date(),
    status: joi.string().required().valid("Confirmed", "Pending", "Cancelled"),
    payment: joi.string().required().valid("credit card", "Cash", null),
  });
  return schema.validate(data);
};

module.exports = reservationValidation;
