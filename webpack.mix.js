const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

// mix.js('resources/js/app.js', 'public/js')
//     .sass('resources/sass/app.scss', 'public/css')
//     .webpackConfig({
//         output: {
//             chunkFilename: 'js/chunk/[name].js',
//         },
//     }).version();

// mix.ts('resources/ts/app.ts', 'public/ts')
//     .sass('resources/sass/app.scss', 'public/css')
//     .webpackConfig({
//         output: {
//             chunkFilename: 'ts/chunk/[name].js',
//         },
//         module: {
//             rules: [
//                 {
//                     test: /\.tsx?$/,
//                     loader: "ts-loader",
//                     exclude: /node_modules/,
//                     options: { appendTsSuffixTo: [/\.vue$/] }
//                 }
//             ]
//         },
//         resolve: {
//             extensions: ["*", ".js", ".jsx", ".vue", ".ts", ".tsx"]
//         }
//     }).version();

mix.js('resources/js/admin/admin.js', 'public/js/admin/admin.js')
    .sass('resources/sass/admin/admin.scss', 'public/css/admin/admin.css')
    .webpackConfig({
        output: {
            chunkFilename: 'js/admin/chunk/[name].js',
        },
    }).version();

