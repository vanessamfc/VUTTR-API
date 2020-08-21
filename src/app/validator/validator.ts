import * as Yup from 'yup';

export default async function validate(schema, data) {
  try {
    return schema.validate(data, {
      stripUnknown: true,
      abortEarly: true,
    });
  } catch (error) {
    throw new Error('validation fails');
  }
}
