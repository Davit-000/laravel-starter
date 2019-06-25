<template>
    <v-navigation-drawer v-model="navigation" :expand-on-hover="mini" clipped fixed overflow app>
        <v-list dense nav shaped>
            <v-list-item link>
                <v-list-item-icon>
                    <v-icon>mdi-view-dashboard-outline</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "Navigation",
        data () {
            return {
                navigation: undefined,
            }
        },
        computed: {
            mini() { return this.$store.state.mini; },
        },
        created() {

        }
    }
</script>
