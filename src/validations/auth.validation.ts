import Joi, { ObjectSchema } from 'joi';

interface ValidationSchema {
  body: ObjectSchema;
}

export const loginBody: ValidationSchema = {
  body: Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
