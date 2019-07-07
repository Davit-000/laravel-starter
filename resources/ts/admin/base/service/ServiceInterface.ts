import { AxiosPromise } from "axios";

export interface ServiceInterface {
    all(params: Object, query: Object): AxiosPromise

    find(params: Object, query: Object): AxiosPromise

    store(resource: Object, params: Object, query: Object): AxiosPromise

    update(resource: Object, params: Object, query: Object): AxiosPromise

    delete(params: Object, query: Object): AxiosPromise

    remove(params: Object, query: Object): AxiosPromise

    restore(params: Object, query: Object): AxiosPromise
}
