import _ from 'lodash';

export default class Form {
    rules;
    
    hidden = [];

    constructor() {
        
    }

    /**
     * Build form hidden
     *
     * @param {Array} hidden
     */
    build(hidden = []) {
        let defaults = 
            ['rules', 'hidden', 'service']
            .concat(hidden)
            .concat(this.hidden);

        return _.omit(this, defaults);
    }

    /**
     * Server validation errors
     *
     * @param {Object} response
     * @param {Boolean} scoped
     * @return {Array}
     */
    static errors(response, scoped = false)
    {
        let err = [], field = '', msg = '', scope = '';

        if (response.status === 422) {
            let errors = response.data.errors;

            for (let key in errors) {
                if (errors.hasOwnProperty(key)) {
                    field = key;
                    msg = errors[key][0];

                    err.push({field, msg});
                }
            }
        }

        return err;
    }
}
