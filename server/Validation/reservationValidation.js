const joi = require("joi");

const reservationValidation = (data) => {
  const schema = joi.object({
    from: joi.date().required().greater("now").message({
      "date.greater": "Check in must be greater than today date",
    }),
    to: joi.date().required().greater(joi.ref("from")).message({
      "date.greater": "Checkout  must be greater Check in",
    }),
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
