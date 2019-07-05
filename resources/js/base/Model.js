import Form from './Form';
import Service from './Service';
import pluralize from 'pluralize';
import _ from 'lodash';

export default class Model extends Form {
    /**
     * The Model service
     * 
     * @type {Service}
     */
    service;

    /**
     * The attributes that should be hidden for arrays. 
     * 
     * @type {Array}
     */
    hidden = [];

    /**
     * The Container that contains all relationships
     * 
     * @type {Array}
     */
    #relations = [];

    /**
     * The Container that contains only relations
     * 
     * @type {Array}
     */
    #only = [];

    /**
     * The Container that contains except relations
     * 
     * @type {Array}
     */
    #except = [];

    /**
     * Model constructor
     *
     * @param {String} endpoint
     * @param {String} prefix
     */
    constructor(endpoint = '', prefix = '') {
        super();

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
        this.#relations.push(child.prototype.constructor.name.toLowerCase());
        
        return this[child.prototype.constructor.name.toLowerCase()] 
            = resource
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
        this.#relations.push(pluralize.plural(child.prototype.constructor.name.toLowerCase()));
        
        return this[pluralize.plural(child.prototype.constructor.name.toLowerCase())] 
            = resources
            ? resources.map(item => new child(item))
            : null;
    }

    with() {
        let form = this.build();

        this.#relations.forEach(relation => {
            if (form.hasOwnProperty(relation) && !form[relation]) {
                delete form[relation]; return;
            }

            form[relation] = this[relation].build();
        });

        if (this.#only.length && !this.#except.length) {

        }
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
