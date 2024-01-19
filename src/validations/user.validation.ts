import Joi, { ObjectSchema } from 'joi';

interface ValidationSchema {
  params?: ObjectSchema;
  body?: ObjectSchema;
}

const cpfRegex = new RegExp(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);

export const userFindOne: ValidationSchema = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export const userCreate: ValidationSchema = {
  body: Joi.object({
    cpf: Joi.string().pattern(cpfRegex).required(),
    name: Joi.string().required(),
    birth_date: Joi.date().required(),
    street: Joi.string().required(),
    house_number: Joi.string().required(),
    complement: Joi.string(),
    neighborhood: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().length(2).required(),
    zip_code: Joi.string().required(),
  }),
};

export const userUpdate: ValidationSchema = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    cpf: Joi.string().pattern(cpfRegex),
    name: Joi.string(),
    birth_date: Joi.date(),
    street: Joi.string(),
    house_number: Joi.string(),
    complement: Joi.string(),
    neighborhood: Joi.string(),
    city: Joi.string(),
    state: Joi.string().length(2),
    zip_code: Joi.string(),
  }),
};

export const userDelete: ValidationSchema = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
