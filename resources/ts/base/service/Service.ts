import axios from 'axios';
import { AxiosPromise } from "axios";
import { ServiceProvider } from "./ServiceProvider";
import { ServiceInterface } from "./ServiceInterface";

export interface ServiceConstructor {
    uri: string;

    prefix?: string;

    group?: string;
}

export class Service extends ServiceProvider implements ServiceInterface {
    constructor(config: ServiceConstructor) {
        super(config);
    }

    all(params: Object = {}, query: Object = {}): AxiosPromise<any> {
        return axios.get(this.url(params), {params: query});
    }

    find(params: Object, query: Object = {}): AxiosPromise<any> {
        return axios.get(this.url(params, true), {params: query});
    }

    store(resource: Object, params: Object = {}, query: Object = {}): AxiosPromise<any> {
        return axios.post(this.url(params), resource, {params: query});
    }

    update(resource: Object, params: Object = {}, query: Object = {}): AxiosPromise<any> {
        return axios.put(this.url(params, true), resource, {params: query});
    }

    delete(params: Object, query: Object = {}): AxiosPromise<any> {
        return axios.delete(this.url(params, true), {params: query});
    }

    remove(params: Object, query: Object = {}): AxiosPromise<any> {
        return axios.delete(this.url(params, true, true), {params: query});
    }

    restore(params: Object, query: Object = {}): AxiosPromise<any> {
        return axios.head(this.url(params, true, true), {params: query});
    }
}
