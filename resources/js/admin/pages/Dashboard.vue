<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card outlined class="mx-auto">
                    <v-card-title>Welcome to Dashboard</v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Snackbar from "../facades/Snackbar";

    export default {
        name: "Dashboard",
        created() {
            Snackbar.success('text');
        }
    }
</script>

<style scoped>

</style>
