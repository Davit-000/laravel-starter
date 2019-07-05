import * as _ from "lodash";
import { AxiosResponse } from "axios";
import { ValidationError } from "./ValidationError";

export class Form {
    protected scope!: string;

    protected rules: [] = [];

    protected hidden: string[] = [];

    protected show: string[] = [];

    private static validationErrors: ValidationError[] = [];

    static errors(response: AxiosResponse): ValidationError[] {
        if (response.status === 422) {
            let field: string = '', msg: string = '';

            for (let key in response.data.errors) {
                if (response.data.errors.hasOwnProperty(key)) {
                    field = key;
                    msg = response.data.errors[key];

                    this.validationErrors.push({field, msg});
                }
            }
        }
        return this.validationErrors;
    }

    build():object {
        let defaults: string[] = ['relations', 'formdata', 'scope', 'rules', 'hidden', 'show', 'only', 'except'];

        return _.omit(this, this.hidden.concat(defaults));
    }
}
