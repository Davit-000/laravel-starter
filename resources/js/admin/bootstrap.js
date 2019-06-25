export const csrf = document.head
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');

import axios from 'axios';
import { Validator } from 'vee-validate';
import { unique, exists, isArray, isBoolean, isString } from '../validators';

axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

Validator.extend('unique',{
    validate: unique,
    getMessage: (field, params, data) => data.message
});

Validator.extend('exists',{
    validate: exists,
    getMessage: (field, params, data) => data.message
});

Validator.extend('array', {
    validate: isArray,
    getMessage: (filed) => `${filed} must be selected`
});

Validator.extend('boolean', {
    validate: isBoolean,
    getMessage: (filed) => `${filed} must be boolean`
});

Validator.extend('string', {
    validate: isString,
    getMessage: (filed) => `${filed} must be string`
});
