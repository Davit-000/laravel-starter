import $http from 'axios';
import pluralize from 'pluralize';

export default class Service
{
    path = '';
    prefix = '';

    /**
     * Regular expression for checking url parameters
     * @type {RegExp}
     */
    #reg = /{\w+}/g;

    /**
     * Service Constructor
     *
     * @param {String} path
     * @param {String} prefix
     */
    constructor(path, prefix = '') {
        this.path = path;
        this.prefix = prefix;
    }

    /**
     * Create Endpoint url for request
     *
     * @param {Object} params route parameters
     * @param {Boolean} args
     * @param {String} soft
     *
     * @return {String}
     */
    #route(params = {}, args, soft = '') {
        let url = this.#createUrl(args, soft);

        if (this.#isCorrect(params, url))
            return Service.#replaceUrlParams(params, url);

        return window.location.origin + '/' + url;
    }

    /**
     * Create full url
     *
     * @param {Boolean} args
     * @param {String} soft
     * @return {String}
     */
    #createUrl(args, soft) {
        return args
            ? (this.prefix ? this.prefix + '/' : '') + this.path + '/{' + pluralize.singular(this.path) + '}' + (soft ? '/' + soft : '')
            : (this.prefix ? this.prefix + '/' : '') + this.path + (soft ? '/' + soft : '');
    }

    /**
     * Check Route parameter matching
     *
     * @param {Object} params route parameters
     * @param {string} url
     * @return {Boolean}
     * @throws {Error}
     */
    #isCorrect(params, url) {
        let matches = url.match(this.#reg);

        if (!matches) return true;

        if (!Object.keys(params).length) throw new Error(`Missing required route params ${matches.join(',')}`);

        for (let key in params) {
            if (!matches.includes(`{${key}}`)) {
                throw new Error(`Missing required route parameter: {${key}}`);
            }

            if (!params[key]) {
                throw new Error(`Not correct route parameter for {${key}}`)
            }
        }

        return true;
    }

    /**
     * Replace route parameters
     *
     * @param {Object} params
     * @param {String} url
     * @return {string}
     */
    static #replaceUrlParams(params, url) {
        for (let key in params) {
            let reg = new RegExp(`{${key}}`);

            url = url.replace(reg, params[key]);
        }

        return window.location.origin + '/' + url;
    }

    /**
     * Get Resource collection
     *
     * @param {Object} params
     * @param {Object} query
     * @param {Boolean} args
     * @return {AxiosPromise<any>}
     */
    all(params = {}, query = {}, args = false) {
        return $http.get(this.#route(params, args), {params: query});
    }

    /**
     * Get resource
     *
     * @param {Object} params
     * @param {Object} query
     * @param {Boolean} args
     * @return {AxiosPromise<any>}
     */
    find(params = {}, query = {}, args = true) {
        return $http.get(this.#route(params, args), {params: query});
    }

    /**
     * Store Resource
     *
     * @param {Object} resource
     * @param {Object} params
     * @param {Object} query
     * @param {Boolean} args
     * @return {AxiosPromise<any>}
     */
    store(resource, params = {}, query = {}, args = false) {
        return $http.post(this.#route(params, args), resource, {params: query});
    }

    /**
     * Update Resource
     *
     * @param {Object} resource
     * @param {Object} params
     * @param {Object} query
     * @param {Boolean} args
     * @return {AxiosPromise<any>}
     */
    update(resource, params = {}, query = {}, args = true) {
        return $http.put(this.#route(params, args), resource, {params: query});
    }

    /**
     * Delete resource
     *
     * @param {Object} params
     * @param {Object} query
     * @param {Boolean} args
     * @return {AxiosPromise}
     */
    delete(params = {}, query = {}, args = true) {
        return $http.delete(this.#route(params, args), {params: query});
    }

    /**
     * Soft Delete specified resource from db
     *
     * @param {Object} params
     * @param {Object} query
     * @param {Boolean} args
     * @returns {AxiosPromise}
     */
    remove(params = {}, query = {}, args = true) {
        return $http.delete(this.#route(params, args, 'remove'), {params: query});
    }

    /**
     * Restore soft deleted resource
     *
     * @param {Object} params
     * @param {Object} query
     * @param {Boolean} args
     * @returns {AxiosPromise}
     */
    restore(params = {}, query = {}, args = true) {
        return $http.put(this.#route(params, args, 'restore'), null,{params: query});
    }
}
