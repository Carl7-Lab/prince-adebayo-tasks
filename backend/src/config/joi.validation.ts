import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.required(),

  DB_HOST: Joi.required(),
  DB_PORT: Joi.number().default(3306),
  DB_USER: Joi.required(),
  DB_PASSWORD: Joi.required(),
  DB_NAME: Joi.required(),

  DEFAULT_LIMIT: Joi.number().default(10),
});
