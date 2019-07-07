import * as _ from 'lodash';
import objectToFormData from 'object-to-formdata';
import { Form } from "../form/Form";
import { Service , ServiceConstructor} from "../service/Service";
import { AxiosPromise } from "axios";

export class ModelProvider extends Form {
    protected formdata: boolean = false;

    protected relations: string[] = [];

    protected only: string[] = [];

    protected except: string[] = [];

    private static service: Service;

    constructor(config:ServiceConstructor) {
        super();

        ModelProvider.service = new Service(config);
    }

    private buildForm() {
        let form = this.build();

        this.relations.forEach(item => {
            if (!form[item]) {
                delete form[item]; return;
            }

            if (form.hasOwnProperty(item) && form[item].constructor === Array) {
                form[item] = form[item].map(relation => relation.build());
            } else {
                form[item] = form[item].build();
            }
        });

        if (this.except.length && !this.only.length) {
            this.except.forEach(relation => {
                if (form.hasOwnProperty(relation)) delete form[relation];
            });
        }

        if (this.only.length && !this.except.length) {
            _.difference(this.relations, this.only).forEach(relation => {
                if (form.hasOwnProperty(relation)) delete form[relation];
            });
        }

        if (this.formdata) {
            return objectToFormData(form, {
                /**
                 * whether or not to include array indices in FormData keys
                 * defaults to false
                 */
                indices: false,
                /**
                 * whether or not to include null values as empty strings in FormData instance
                 * defaults to true
                 */
                nulls: true
            });
        }

        return form;
    }

    static all(params: object = {}, query: object = {}):AxiosPromise {
        return this.service.all(params, query);
    }

    static find(params:object = {}, query:object = {}):AxiosPromise {
        return ModelProvider.service.find(params, query);
    }

    store(params: object = {}, query: object = {}): AxiosPromise {
        return ModelProvider.service.store(this.buildForm(), params, query);
    }

    update(params: object = {}, query: object = {}): AxiosPromise {
        return ModelProvider.service.update(this.buildForm(), params, query);
    }

    delete(params: object = {}, query: object = {}):AxiosPromise {
        return ModelProvider.service.delete(params, query);
    }

    remove(params: object = {}, query: object = {}):AxiosPromise {
        return ModelProvider.service.remove(params, query);
    }

    restore(params: object = {}, query: object = {}):AxiosPromise {
        return ModelProvider.service.restore(params, query);
    }
}
