import Vue from 'vue';
import vuetify from './plugins/vuetify';
import router from './plugins/router';
import store from './plugins/store';
import VeeValidate from 'vee-validate';

import { csrf } from "./bootstrap";

Vue.prototype.$csrf = csrf;

Vue.use(VeeValidate);

new Vue({
    el: '#app',
    props: {},
    store,
    router,
    vuetify
});
