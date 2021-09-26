import Joi from 'joi';

const schema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
});

const validate = (data) => {
  const result = schema.validate(data);
  result.value = data;
  return result;
};

export default validate;
