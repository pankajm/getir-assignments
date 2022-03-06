const Joi = require('@hapi/joi');

function validate(body, schema){   
  const joiSchema = Joi.object(schema);
  return joiSchema.validate(body);
}

module.exports = {
  validate
}