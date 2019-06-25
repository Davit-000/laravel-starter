<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-app-bar clipped-left fixed app>
        <v-app-bar-nav-icon @click="toggleMini"></v-app-bar-nav-icon>

        <v-toolbar-title>MagicTrack</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-text-field
            prepend-inner-icon="mdi-magnify"
            append-icon="mdi-microphone"
            label="Search"
            class="mx-3"
            solo-inverted
            hide-details
            flat
        ></v-text-field>

        <v-spacer></v-spacer>

        <v-btn icon href="/settings">
            <v-icon>mdi-settings-outline</v-icon>
        </v-btn>

        <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
            <template v-slot:activator="{ on }">
                <v-btn v-on="on" v-if="auth.check" class="ml-1" icon>
                    <v-avatar color="primary">
                        <img :src="auth.user.avatar" :alt="auth.user.username" v-if="false">
                        <span class="white--text headline" v-else>{{auth.user.username.charAt(0)}}</span>
                    </v-avatar>
                </v-btn>
            </template>

            <v-card v-if="auth.check">
                <v-list>
                    <v-list-item>
                        <v-list-item-avatar color="primary">
                            <img :src="auth.user.avatar" :alt="auth.user.username" v-if="false">
                            <span class="white--text headline" v-else>{{auth.user.username.charAt(0)}}</span>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>{{auth.user.username}}</v-list-item-title>
                            <v-list-item-subtitle>
                                <a href="#">{{auth.user.name}}</a>
                            </v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-form :action="logout" method="post" ref="logout">
                                <input type="hidden" name="_token" :value="$csrf">
                                <v-btn color="primary" text icon @click="$refs.logout.$el.submit()">
                                    <v-icon>mdi-logout-variant</v-icon>
                                </v-btn>
                            </v-form>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>
            </v-card>
        </v-menu>
    </v-app-bar>
</template>

<script>
    export default {
        name: "Toolbar",
        props: {
            logout: {
                required: true,
                type: String
            }
        },
        data: () => ({
            menu: false
        }),
        methods: {
            toggleMini() {
                this.$store.commit('TOGGLEMINI', !this.mini);
            }
        },
        computed: {
            auth() { return this.$store.state.auth; },
            mini() { return this.$store.state.mini; },
        }
    }
</script>

<style scoped>

</style>
