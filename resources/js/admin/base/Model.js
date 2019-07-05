import Form from './Form';
import Service from './Service';

export default class Model extends Form {
    /**
     * @type {Service}
     */
    service;

    /**
     * Model constructor
     *
     * @param {String} endpoint
     * @param {String} prefix
     * @param {Array} hidden
     */
    constructor(endpoint, prefix = '', hidden = []) {
        super(hidden);

        this.service = new Service(endpoint, prefix);
    }

    /**
     * Has one relationship
     *
     * @param {FunctionConstructor} child
     * @param {Object} resource
     * @return {*}
     */
    hasOne(child, resource) {
        return this[child.prototype.constructor.name.toLowerCase()] = resource
            ? new child(resource)
            : null;
    }

    /**
     * Has Many Relationship
     *
     * @param {FunctionConstructor} child
     * @param {Array} resources
     * @return {*}
     */
    hasMany(child, resources) {
        return this[child.prototype.constructor.name.toLowerCase()] = resources
            ? resources.map(item => new child(item))
            : null;
    }

    /**
     * Store Resource
     *
     * @param {Object} params
     * @param {Object} query
     * @return {*|AxiosPromise<any>|number}
     */
    store(params = {}, query = {}) {
        return this.service.store(this.build(['id']), params, query);
    }

    /**
     * Update settings resource
     *
     * @param {Object} params
     * @param {Object} query
     * @return {AxiosPromise<any>}
     */
    update(params = {}, query = {}) {
        return this.service.update(this.build(['id']), params, query);
    }

    /**
     * Destroy Resource
     *
     * @param params
     * @param query
     * @return {*}
     */
    delete(params = {}, query = {}) {
        return this.service.delete(params, query);
    }

    /**
     * Trash Policy
     *
     * @param {Object} params
     * @param {Object} query
     * @return {AxiosPromise}
     */
    remove(params, query) {
        return this.service.remove(params, query)
    }

    /**
     * Restore trashed Policy
     *
     * @param {Object} params
     * @param {Object} query
     * @return {AxiosPromise}
     */
    restore(params, query) {
        return this.service.restore(params, query);
    }
}
