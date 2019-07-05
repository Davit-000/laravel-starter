<template>
    <div class="container">
        <div class="card-columns">
            <product v-for="product in items" :key="product.slug" :item="product"></product>
        </div>
    </div>
</template>

<script>
    import Product from './Product';

    export default {
        name: 'Products',
        props: {
            products: {
                required: true,
                type: Array
            }
        },
        data() {
            return {
                items: this.products
            }
        },
        mounted() {
            Echo.channel('laravel_database_app-products')
                .listen('.product.created', (e) => {
                    console.log(e.product);
                    this.items.splice(0, 0, e.product);
                });
        },
        components: {
            product: Product
        }
    }
</script>
