const mix = require('laravel-mix');
let fs = require('fs');

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

const resourcePath = './modules/Core';
const publicPath = './public/themes/backend/modules/core';


mix
    .js(resourcePath + '/resources/assets/js/manifest.js', publicPath + '/js')
    .copy(publicPath + '/js/manifest.js', resourcePath + '/public/js')

mix
    .js(resourcePath + '/resources/assets/js/vendor.js', publicPath + '/js')
    .copy(publicPath + '/js/vendor.js', resourcePath + '/public/js')

mix
    .js(resourcePath + '/resources/assets/js/index.js', publicPath + '/js')
    .copy(publicPath + '/js/index.js', resourcePath + '/public/js')
    .react()
    .sourceMaps();


mix
    .sass(resourcePath + '/resources/assets/sass/index.scss', publicPath + '/css')
    .copy(publicPath + '/css/index.css', resourcePath + '/public/css')

