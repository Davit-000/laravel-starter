import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify'
import VueRouter from 'vue-router';
import VeeValidate from 'vee-validate';

import { store} from "./store";
import { routes } from "./routes";
import { csrf } from './bootstrap';
import Snackbar from "./facades/Snackbar";

Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(VeeValidate);

Vue.prototype.$csrf = csrf;
Vue.component('snackbar', require('./components/Snackbar').default);

const el = document.getElementById('app');

new Vue({
    el: '#app',
    props: ['auth'],
    propsData: {
        auth: JSON.parse(el.dataset.auth)
    },
    store: new Vuex.Store(store),
    router: new VueRouter({routes, mode: 'history'}),
    vuetify: new Vuetify({ iconfont: 'mdi' }),
    created() {
        new Snackbar(this.$store);

        this.$store.commit('INITAUTH', this.auth);
    }
});
