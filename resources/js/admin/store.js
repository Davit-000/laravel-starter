export const store = {
    state: {
        mini: false,
        auth: {
            check: false,
            user: null
        }
    },
    getters: {

    },
    mutations: {
        /**
         * Init auth
         *
         * @param {Object} state
         * @param {{auth: boolean, user: null|Object}} payload
         * @constructor
         */
        INITAUTH(state, payload) {
            state.auth = {...payload};
        },
        /**
         * Toggle navigation mini variant
         *
         * @param {Object} state
         * @param {Boolean} payload
         * @constructor
         */
        TOGGLEMINI(state, payload) {
            state.mini = payload;
        }
    },
    actions: {

    }
};
