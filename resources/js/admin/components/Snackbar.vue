<template>
    <v-snackbar
        :value="snackbar.show"
        :timeout="snackbar.timeout"
        :color="snackbar.color"
        bottom
        right
    >
        {{snackbar.text}}
        <v-btn dark text @click="close">
            Close
        </v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        name: "Snackbar",
        computed: {
            snackbar() { return this.$store.state.snackbar; }
        },
        methods: {
            close() {
                this.$store.commit('SNACKBAR', {
                    show: false,
                    text: '',
                });
            }
        }
    }
</script>

<style scoped>

</style>
