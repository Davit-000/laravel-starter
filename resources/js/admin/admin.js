import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify'
import VueRouter from 'vue-router';
import VeeValidate from 'vee-validate';

import { store} from "./store";
import { routes } from "./routes";
import { csrf } from './bootstrap';

Vue.prototype.$csrf = csrf;

Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(VeeValidate);

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
        this.$store.commit('INITAUTH', this.auth)
    }
});
