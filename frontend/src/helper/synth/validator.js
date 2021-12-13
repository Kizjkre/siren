import Ajv from 'ajv';
import schema from './schema.json'

const ajv = new Ajv({ $data: true });

const validate = ajv.compile(schema);

export const validateSynth = data => [validate(data), validate.errors];
