<template>
    <div class="card">
        <img src="/" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{item.name}}</h5>
            <p class="card-text">{{item.description}}</p>
        </div>
        <div class="card-footer">
            <small class="text-muted">Last updated {{item.created_at}}</small>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Product",
        props: {
            item: {
                required: true,
                type: Object
            }
        }
    }
</script>

<style scoped>

</style>
