<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card outlined class="mx-auto" :loading="loading">
                    <v-toolbar color="white" flat>
                        <v-btn icon @click="back">
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>

                        <v-spacer></v-spacer>
                        <v-img :src="'../img/svg/online-shop.svg'" max-height="50" max-width="50" aspect-ratio="1" alt="Alligator"></v-img>
                        <v-spacer></v-spacer>

                        <v-btn icon>
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </v-toolbar>

                    <v-card-title>
                        <div class="text-xs-center" style="width: 100%">
                            <div>{{heading.header}}</div>
                            <span class="subtitle-1" v-html="heading.text"></span>
                        </div>
                    </v-card-title>

                    <v-form ref="login" method="post" :action="action">
                        <input type="hidden" name="_token" :value="$csrf">

                        <v-window v-model="step">
                            <v-window-item :value="1" eager>
                                <v-card-text>
                                    <v-text-field
                                        v-model="auth.username"
                                        v-validate.disable="auth.rules.username"
                                        :error-messages="errors.collect('username')"
                                        @keypress.enter.prevent="next"
                                        hint="This is the email you will use to login to your Alligator.com account"
                                        prepend-inner-icon="mdi-account-check-outline"
                                        browser-autocomplete="off"
                                        label="Username"
                                        name="username"
                                        ref="username"
                                        persistent-hint
                                        autofocus
                                        outlined
                                    ></v-text-field>
                                </v-card-text>
                            </v-window-item>

                            <v-window-item :value="2" eager>
                                <v-card-text>
                                    <v-layout justify-center>
                                        <v-chip class="ma-2" outlined @click="step=1">
                                            <v-avatar left>
                                                <v-icon>mdi-account-circle-outline</v-icon>
                                            </v-avatar>
                                            {{auth.username}}
                                            <v-icon right>mdi-chevron-down</v-icon>
                                        </v-chip>
                                    </v-layout>

                                    <v-text-field
                                        v-model="auth.password"
                                        v-validate="auth.rules.password"
                                        :error-messages="errors.collect('password')"
                                        :append-icon="icon"
                                        prepend-inner-icon="mdi-lock-outline"
                                        label="Password"
                                        name="password"
                                        ref="password"
                                        :type="type"
                                        autofocus
                                        outlined
                                        @click:append="show = !show"
                                        @keypress.enter="next"
                                    ></v-text-field>

                                    <v-checkbox
                                        v-model="auth.remember"
                                        v-validate="auth.rules.remember"
                                        :error-messages="errors.collect('remember')"
                                        :false-value="null"
                                        :true-value="1"
                                        browser-autocomplete="off"
                                        label="Remember Me?"
                                        type="checkbox"
                                        color="primary"
                                        name="remember"
                                    ></v-checkbox>
                                </v-card-text>
                            </v-window-item>
                        </v-window>

                        <v-card-actions>
                            <v-btn href="/register" text color="primary">Create Account</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="next">{{text}}</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>

                <v-card class="mt-3" dense>
                    <v-card-text>
                        <p>
                            By signing in or creating an account, you agree with our
                            <a href="#">Terms & Conditions</a> and
                            <a href="#">Privacy Statement</a>
                        </p>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Login from '../../forms/auth/Login';

    export default {
        name: "Login",
        props: {
            errs: {
                required: true,
                type: [Array, Object],
                default: () => []
            },
            inputs: {
                required: false,
                default: () => [],
                type: [Array, Object]
            },
            action: {
                required: true,
                type: String
            }
        },
        data:() => ({
            loading: false,
            show: false,
            auth: {},
            step: 1
        }),
        methods: {
            next() {
                switch (this.step) {
                    case 1:
                        this.loading = true;
                        this.$refs.username.blur();
                        this.$validator.validateAll('username').then(valid => {
                            if (valid) this.step++;

                            this.loading = false;
                        });
                        break;
                    case 2:
                        this.loading = true;
                        this.$refs.password.blur();
                        this.$validator.validateAll().then(valid => {
                            if (valid) this.$refs.login.$el.submit();
                        });
                        break;
                }
            },
            back() {
                if (this.step > 1) this.step--;
            }
        },
        computed: {
            type() {
                return this.show ? 'text' : 'password';
            },
            icon() {
                return this.show ? 'mdi-eye-off' : 'mdi-eye';
            },
            text() {
                return this.step === 2 ? 'Login' : 'Next';
            },
            heading() {
                switch (this.step) {
                    case 1:
                        return {
                            header: 'Sign in',
                            text: 'To continue to MagicTrack'
                        };
                    case 2:
                        return {
                            header: 'Welcome',
                            text: ''
                        };
                }
            },
        },
        created() {
            this.auth = new Login();
            /**
             * attaching old input values after submitting register form
             */
            if (this.inputs.constructor === Object) {
                for (let key in this.inputs) {
                    if (this.inputs.hasOwnProperty(key)) {
                        this.auth[key] = this.inputs[key];
                    }
                }
            }
            /* adding backend validation errors to error bag*/
            if (this.errs.constructor === Object) {
                Login.errors({status: 422, data: {errors: this.errs}})
                    .forEach(error => this.errors.add(error));
            }
        },
        mounted() {
            this.$refs.username.blur();
        }
    }
</script>
